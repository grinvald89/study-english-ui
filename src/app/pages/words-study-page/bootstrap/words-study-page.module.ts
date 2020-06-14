import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/shared/material.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { DailyStatisticsModule } from 'src/statistics/daily-statistics/bootstrap/daily-statistics.module';
import { WordsStudyPageRoutingModule } from './words-study-page-routing.module';
import { WordsStudyPageComponent } from '../ui/words-study-page/words-study-page.component';

/**
 * Модуль для отображения страницы изучения слов
 */
@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        PipesModule,
        DailyStatisticsModule,
        WordsStudyPageRoutingModule,
    ],
    declarations: [
        WordsStudyPageComponent
    ],
    providers: []
})
export class WordsStudyPageModule { }
