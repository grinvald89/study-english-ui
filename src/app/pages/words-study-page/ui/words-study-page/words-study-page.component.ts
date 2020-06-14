import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import swal from 'sweetalert2';

import { WordDTO } from 'src/app/shared/models/word-dto/word-dto';
import { TranslateDTO } from 'src/app/shared/models/translate-dto/translate-dto';
import { DailyStatistics } from 'src/statistics/daily-statistics/data/models/daily-statistics/daily-statistics';

import { MOCK_WORD } from './mocks/mock-word';
import { MOCK_ANSWERS } from './mocks/mock-answers';
import { MOCK_DAILY_STATISTICS } from './mocks/mock-daily-statistics';
import { WordsService } from '../../data/words.service';

const COUNT_ANSWERS: number = 10;

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

    private loaded: boolean = false;
    private word: WordDTO;
    private answers: TranslateDTO[] = [];
    private rightAnswer: TranslateDTO;
    private dailyStatistics: DailyStatistics[] = MOCK_DAILY_STATISTICS;

    get Loaded(): boolean {
        return this.loaded;
    }
    set Loaded(value: boolean) {
        this.loaded = value;
        this.changeDetector.detectChanges();
    }

    get Word(): WordDTO {
        return this.word;
    }
    set Word(value: WordDTO) {
        this.word = value;
        this.updateAnswers();
        this.updateRightAnswer();
    }

    get Answers(): TranslateDTO[] {
        return this.answers;
    }
    set Answers(value: TranslateDTO[]) {
        this.answers = value;
    }

    get RightAnswer(): TranslateDTO {
        return this.rightAnswer;
    }
    set RightAnswer(value: TranslateDTO) {
        this.rightAnswer = value;
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
    public ngOnInit(): void {
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
     * Выбрать вариант ответа
     * @param index - индекс выбранного варианта ответа
     */
    public selectAnswer(answer: TranslateDTO): void {
        if (this.Word.id === undefined) {
            return;
        }

        this.Loaded = false;

        const isCorrect: boolean = answer.id === this.RightAnswer.id;
        this.wordsService.sendAnswers(this.Word.id, isCorrect)
            .pipe(
                takeUntil(this.destructor$),
                finalize(() => this.Loaded = true)
            )
            .subscribe(_ => _);
    }

    /**
     * Обновляет слово
     */
    private updateWord(): void {
        this.Loaded = false;

        this.wordsService.getRandomWord()
            .pipe(
                takeUntil(this.destructor$),
                finalize(() => this.Loaded = true)
            )
            .subscribe(res => this.Word = res);
    }

    /**
     * Обновляет варианты ответа
     */
    private updateAnswers(): void {
        if (!this.Word || !this.Word.id) {
            return;
        }

        this.Loaded = false;

        this.wordsService.getAnswersByWordId(this.Word.id)
            .pipe(
                takeUntil(this.destructor$),
                finalize(() => this.Loaded = true)
            )
            .subscribe(res => this.Answers = this.insertRightAnswerInAnwerList(res));
    }

    /**
     * Обновляет правильный ответ
     */
    private updateRightAnswer(): void {
        const rightAnswer = this.Word.translate.find(i => i.isPrimary);

        if (!rightAnswer) {
            swal.fire(
                'Ошибка!',
                `Правильный вариант перевода для слова ${this.Word.text} не найден!`,
                'error'
            );
        } else {
            this.RightAnswer = rightAnswer;
        }
    }

    /**
     * Вставляет правильный вариант ответа в список ответов и возвращает новый список ответов
     */
    private insertRightAnswerInAnwerList(answerList: TranslateDTO[]): TranslateDTO[] {
        let result: TranslateDTO[] = [];
        const randomIndex: number = Math.floor(COUNT_ANSWERS * Math.random());

        const firstHalfAnswers: TranslateDTO[] = answerList.slice(0, randomIndex);
        const secondHalfAnswers: TranslateDTO[] = answerList.slice(randomIndex);

        result = firstHalfAnswers;
        result.push(this.RightAnswer);
        result = result.concat(secondHalfAnswers);

        return result;
    }
}
