import {Component} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {AuthLogin, AuthState} from '@core/store';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    @Select(AuthState.isLoggedIn)
    isLoggedIn$: Observable<boolean>;

    constructor(private store: Store) {
    }

    login(): void {
        this.store.dispatch(new AuthLogin());
    }
}
