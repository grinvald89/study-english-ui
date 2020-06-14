import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppConfigService } from 'src/app/app-config/app-config.service';
import { DailyStatisticsDTO } from 'src/app/shared/models/daily-statistics-dto/daily-statistics-dto';

@Injectable({
    providedIn: 'root'
})
export class DailyStatisticsService {
    get Url(): string {
        return this.appConfigService.Config.remoteServiceBaseUrl;
    }

    constructor(
        private readonly http: HttpClient,
        private readonly appConfigService: AppConfigService
    ) { }

    /**
     * Возращает слово
     */
    public getDailyStatistics(): Observable<DailyStatisticsDTO[]> {
        return this.http.get<DailyStatisticsDTO[]>(`${this.Url}api/DailyStatistics`);
    }
}
