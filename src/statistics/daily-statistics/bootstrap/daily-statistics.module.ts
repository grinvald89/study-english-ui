import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/shared/material.module';
import { DailyStatisticsComponent } from '../ui/daily-statistics/daily-statistics.component';

/**
 * Модуль для отображения дневной статистики
 */
@NgModule({
    imports: [
        CommonModule,
        MaterialModule
    ],
    exports: [DailyStatisticsComponent],
    declarations: [DailyStatisticsComponent]
})
export class DailyStatisticsModule { }
