import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';

import { WordDTO } from 'src/app/shared/models/word-dto/word-dto';
import { TranslateDTO } from 'src/app/shared/models/translate-dto/translate-dto';
import { DailyStatistics } from 'src/statistics/daily-statistics/data/models/daily-statistics/daily-statistics';

import { MOCK_WORD } from './mocks/mock-word';
import { MOCK_ANSWERS } from './mocks/mock-answers';
import { MOCK_DAILY_STATISTICS } from './mocks/mock-daily-statistics';
import { WordsService } from '../../data/words.service';

/**
 * Компонент для отображения страницы изучения слов
 */
@Component({
    selector: 'words-study-page',
    templateUrl: './words-study-page.component.html',
    styleUrls: ['./words-study-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordsStudyPageComponent implements OnInit, OnDestroy {
    private destructor$: Subject<boolean> = new Subject<boolean>();

    private word: WordDTO = MOCK_WORD;
    private answers: TranslateDTO[] = MOCK_ANSWERS;
    private dailyStatistics: DailyStatistics[] = MOCK_DAILY_STATISTICS;

    get Word(): WordDTO {
        return this.word;
    }
    set Word(value: WordDTO) {
        this.word = value;
    }

    get Answers(): TranslateDTO[] {
        return this.answers;
    }
    set Answers(value: TranslateDTO[]) {
        this.answers = value;
    }

    get DailyStatistics(): DailyStatistics[] {
        return this.dailyStatistics;
    }
    set DailyStatistics(value: DailyStatistics[]) {
        this.dailyStatistics = value;
    }

    constructor(
        private readonly wordsService: WordsService,
        private readonly changeDetector: ChangeDetectorRef
    ) { }

    /**
     * Инициализация компонента
     */
    ngOnInit() {
        this.updateWord();
    }

    /**
     * Деструктор компонента
     */
    public ngOnDestroy(): void {
        this.destructor$.next(true);
        this.destructor$.complete();
    }

    /**
     * Обновляет слово
     */
    private updateWord(): void {
        this.wordsService.getRandomWord()
            .pipe(takeUntil(this.destructor$))
            .subscribe(res => this.Word = res);
    }
}
