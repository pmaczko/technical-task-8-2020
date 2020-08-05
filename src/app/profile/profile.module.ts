import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DetailsComponent} from './components/details/details.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
    declarations: [DetailsComponent],
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule
    ]
})
export class ProfileModule {
}
