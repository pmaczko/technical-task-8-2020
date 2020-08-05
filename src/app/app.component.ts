import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {AuthInit, AuthLogout, AuthState} from '@core/store';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    @Select(AuthState.isLoggedIn)
    isLoggedIn$: Observable<boolean>;

    constructor(private store: Store) {
    }

    ngOnInit(): void {
        this.store.dispatch(new AuthInit());
    }

    logout(): void {
        this.store.dispatch(new AuthLogout());
    }
}
