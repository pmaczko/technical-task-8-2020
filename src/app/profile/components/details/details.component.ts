import {Component, OnInit} from '@angular/core';
import {AuthLogout, AuthState} from '@core/store';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
    @Select(AuthState.user)
    user$: Observable<gapi.auth2.GoogleUser>;

    constructor(private store: Store) {
    }

    ngOnInit(): void {
    }

    logout(): void {
        this.store.dispatch(new AuthLogout());
    }
}
