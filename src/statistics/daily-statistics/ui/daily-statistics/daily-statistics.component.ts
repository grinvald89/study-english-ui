import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import * as moment from 'moment';

import { DailyStatisticsDTO } from 'src/app/shared/models/daily-statistics-dto/daily-statistics-dto';

/**
 * Компонент для отображения дневной статистики
 */
@Component({
    selector: 'statistics_daily-statistics',
    templateUrl: './daily-statistics.component.html',
    styleUrls: ['./daily-statistics.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DailyStatisticsComponent {
    private dailyStatistics: DailyStatisticsDTO[] = [];

    @Input('DailyStatistics')
    get DailyStatistics(): DailyStatisticsDTO[] {
        return this.dailyStatistics;
    }
    set DailyStatistics(value: DailyStatisticsDTO[]) {
        value.forEach(c => c.time = moment(c.studyHistory.date).format('HH:mm:ss'));
        this.dailyStatistics = value;
    }
}
