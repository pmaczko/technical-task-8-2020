import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgxsModule} from '@ngxs/store';
import {AuthState} from '@core/store';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule,
        NgxsModule.forFeature([AuthState]),
    ]
})
export class CoreModule {
}
