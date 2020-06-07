import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AppConfigService } from './app-config/app-config.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnDestroy {
    private appConfigLoaded: boolean = false;
    private destructor$: Subject<boolean> = new Subject<boolean>();

    get AppConfigLoaded(): boolean {
        return this.appConfigLoaded;
    }
    set AppConfigLoaded(value: boolean) {
        this.appConfigLoaded = value;
        this.changeDetector.detectChanges();
    }

    constructor(
        private readonly appConfigService: AppConfigService,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        this.appConfigService.init()
            .pipe(takeUntil(this.destructor$))
            .subscribe(_ => this.appConfigLoaded = true);
    }

    /**
     * Деструктор компонента
     */
    public ngOnDestroy(): void {
        this.destructor$.next(true);
        this.destructor$.complete();
    }
}
