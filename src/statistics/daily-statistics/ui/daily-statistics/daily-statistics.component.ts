import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { DailyStatistics } from '../../data/models/daily-statistics/daily-statistics';

/**
 * Компонент для отображения статистики в графическом виде
 */
@Component({
    selector: 'statistics_daily-statistics',
    templateUrl: './daily-statistics.component.html',
    styleUrls: ['./daily-statistics.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DailyStatisticsComponent implements OnInit {
    private dailyStatistics: DailyStatistics[] = [];

    @Input('DailyStatistics')
    get DailyStatistics(): DailyStatistics[] {
        return this.dailyStatistics;
    }
    set DailyStatistics(value: DailyStatistics[]) {
        this.dailyStatistics = value;
    }

    constructor() { }

    ngOnInit() {
    }
}
