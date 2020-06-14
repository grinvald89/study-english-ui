import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PercentPipe } from 'src/app/shared/pipes/percent.pipe';

/**
 * Модуль для отображения страницы изучения слов
 */
@NgModule({
    imports: [CommonModule],
    declarations: [
        PercentPipe
    ],
    providers: [PercentPipe]
})
export class PipesModule { }
