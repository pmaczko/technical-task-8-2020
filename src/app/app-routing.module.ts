import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './auth/components/login/login.component';
import {DetailsComponent} from './profile/components/details/details.component';
import {AuthModule} from './auth/auth.module';
import {ProfileModule} from './profile/profile.module';
import {AuthGuard} from '@core/guards/auth.guard';

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'details', component: DetailsComponent, canActivate: [AuthGuard]},
    {path: '', redirectTo: 'details', pathMatch: 'full'},
];

@NgModule({
    imports: [
        AuthModule,
        ProfileModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
