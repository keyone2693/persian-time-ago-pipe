
import { NgModule } from '@angular/core';
import { PersianTimeAgoPipe } from './persian-time-ago.pipe';

@NgModule({
    declarations: [PersianTimeAgoPipe],
    exports: [PersianTimeAgoPipe],
    providers: [PersianTimeAgoPipe]
})
export class PersianTimeAgoModule { }