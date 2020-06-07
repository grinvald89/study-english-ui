import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
    private word: WordDTO = MOCK_WORD;
    private answers: TranslateDTO[] = MOCK_ANSWERS;
    private dailyStatistics: DailyStatistics[] = MOCK_DAILY_STATISTICS;
    private destructor$: Subject<boolean> = new Subject<boolean>();


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

    constructor(private readonly wordsService: WordsService) { }

    /**
     * Инициализация компонента
     */
    ngOnInit() {
        this.wordsService.getWord()
            .pipe(takeUntil(this.destructor$))
            .subscribe(res => console.log(res));
    }

    /**
     * Деструктор компонента
     */
    public ngOnDestroy(): void {
        this.destructor$.next(true);
        this.destructor$.complete();
    }
}
