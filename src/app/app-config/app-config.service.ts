import {
    Injectable,
    OnDestroy
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { AppConfig } from './app-config';

/**
 * Сервис для работы с конфигурацией приложения
 */
@Injectable({
    providedIn: 'root'
})
export class AppConfigService implements OnDestroy {
    private config: AppConfig = new AppConfig();
    private destructor$: Subject<boolean> = new Subject<boolean>();

    get Config(): AppConfig {
        return this.config;
    }
    set Config(value: AppConfig) {
        this.config = value;
    }

    constructor(private readonly http: HttpClient) { }

    /**
     * Инициализация сервиса
     */
    public init(): Observable<AppConfig> {
        return this.http.get('assets/config.json')
            .pipe(
                takeUntil(this.destructor$),
                map((res: AppConfig) => this.Config = res)
            );
    }

    /**
     * Деструктор сервиса
     */
    public ngOnDestroy(): void {
        this.destructor$.next(true);
        this.destructor$.complete();
    }
}
