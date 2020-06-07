import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/shared/material.module';
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
        DailyStatisticsModule,
        WordsStudyPageRoutingModule,
    ],
    declarations: [WordsStudyPageComponent]
})
export class WordsStudyPageModule { }
