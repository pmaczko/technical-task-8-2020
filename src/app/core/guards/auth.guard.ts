import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Select} from '@ngxs/store';
import {AuthState} from '@core/store';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    @Select(AuthState.isLoggedIn)
    isLoggedIn$: Observable<boolean>;
    private isLoggedIn = false;

    constructor(private router: Router) {
        this.isLoggedIn$.subscribe((isLoggedIn) => {
            this.isLoggedIn = isLoggedIn;
        });
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.isLoggedIn) {
            this.router.navigateByUrl('login');
            return false;
        } else {
            return true;
        }
    }
}
