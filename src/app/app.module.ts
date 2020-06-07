import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Type, ModuleWithProviders } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DailyStatisticsModule } from '../statistics/daily-statistics/bootstrap/daily-statistics.module';
import { WordsStudyPageModule } from './pages/words-study-page/bootstrap/words-study-page.module';

/**
 * Модули статистики
 */
const STATISTICS_MODULES: Type<any>[] | ModuleWithProviders[] | any[] = [
    DailyStatisticsModule
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        STATISTICS_MODULES,
        BrowserAnimationsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
