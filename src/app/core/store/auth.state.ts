import {Action, Selector, State, StateContext} from '@ngxs/store';
import {AuthStateModel} from '../models';
import * as authActions from './auth.actions';
import {AuthActions} from './auth.actions';
import {AuthService} from '../services';
import {Router} from '@angular/router';
import {asapScheduler, from, Observable, of} from 'rxjs';
import {Injectable, NgZone} from '@angular/core';
import {catchError, map} from 'rxjs/operators';

@State<AuthStateModel>({
    name: 'authState',
    defaults: {
        user: null,
        error: ''
    }
})
@Injectable()
export class AuthState {
    constructor(private authService: AuthService, private router: Router, private ngZone: NgZone) {
    }

    @Selector()
    static user(state: AuthStateModel): gapi.auth2.GoogleUser | null {
        return state.user;
    }

    @Selector()
    static isLoggedIn(state: AuthStateModel): boolean {
        return !!state.user ? state.user.isSignedIn() : false;
    }

    @Selector()
    static error(state: AuthStateModel): string {
        return state.error;
    }

    @Action(authActions.AuthInit)
    init({dispatch}: StateContext<AuthStateModel>): void {
        this.authService.initGoogleApiAuth().then((user: gapi.auth2.GoogleUser) => {
            dispatch(new authActions.AuthSetUser(user));
        });
    }

    @Action(authActions.AuthSetUser)
    setUser({patchState, getState}: StateContext<AuthStateModel>, {payload}: authActions.AuthSetUser): void {
        patchState({user: payload});
        this.checkUrl(getState);
    }

    @Action(authActions.AuthSetError)
    setError({patchState}: StateContext<AuthStateModel>, {payload}: authActions.AuthSetError): void {
        patchState({error: payload});
    }

    @Action(authActions.AuthLogin)
    login({dispatch, getState}: StateContext<AuthStateModel>): Observable<AuthActions> {
        return from(this.authService.authenticate())
            .pipe(
                map((user: gapi.auth2.GoogleUser) => {
                    return asapScheduler.schedule(() => {
                        this.checkUrl(getState);
                        return dispatch(new authActions.AuthSetUser(user));
                    });
                }),
                catchError((error: string) =>
                    of(
                        asapScheduler.schedule(() => {
                            this.checkUrl(getState);
                            return dispatch(new authActions.AuthSetError(error));
                        })
                    )
                )
            );
    }

    @Action(authActions.AuthLogout)
    logout({dispatch, getState}: StateContext<AuthStateModel>): Observable<AuthActions> {
        this.authService.logout();
        this.checkUrl(getState);
        return of(dispatch(new authActions.AuthSetUser(null)));
    }

    private checkUrl(fnGetState: () => AuthStateModel): void {
        setTimeout(() => {
            const state = fnGetState();
            switch (true) {
                case this.router.isActive('/login', false) && AuthState.isLoggedIn(state):
                    this.ngZone.run(() => this.router.navigateByUrl('')).then();
                    break;
                case !this.router.isActive('/login', false) && !AuthState.isLoggedIn(state):
                    this.ngZone.run(() => this.router.navigateByUrl('login')).then();
                    break;
            }
        }, 100);
    }
}
