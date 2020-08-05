import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MathPipe} from './pipes/math.pipe';

@NgModule({
    declarations: [
        MathPipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        MathPipe
    ]
})
export class SharedModule {
}
