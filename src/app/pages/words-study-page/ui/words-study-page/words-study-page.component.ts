import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import swal from 'sweetalert2';

import { WordDTO } from 'src/app/shared/models/word-dto/word-dto';
import { TranslateDTO } from 'src/app/shared/models/translate-dto/translate-dto';
import { DailyStatisticsDTO } from 'src/app/shared/models/daily-statistics-dto/daily-statistics-dto';

import { MOCK_WORD } from './mocks/mock-word';
import { MOCK_ANSWERS } from './mocks/mock-answers';
import { WordsService } from '../../data/words.service';
import { PercentPipe } from 'src/app/shared/pipes/percent.pipe';
import { DailyStatisticsService } from '../../data/daily-statistics.service';

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
    private dailyStatistics: DailyStatisticsDTO[] = [];
    private showAssociation: boolean = false;

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
        this.changeDetector.detectChanges();
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

    get DailyStatistics(): DailyStatisticsDTO[] {
        return this.dailyStatistics;
    }
    set DailyStatistics(value: DailyStatisticsDTO[]) {
        this.dailyStatistics = value;
        this.changeDetector.detectChanges();
    }

    get WordCorrectAnswers(): number {
        if (!this.Word || !Array.isArray(this.Word.studyHistory)) {
            return 0;
        }
        return this.Word.studyHistory.filter(i => i.correct).length;
    }

    get WordCorrectness(): string {
        return this.percentPipe.transform(this.Word.statistics.correctness);
    }

    get ShowAssociation(): boolean {
        return this.showAssociation;
    }
    set ShowAssociation(value: boolean) {
        this.showAssociation = value;
    }

    constructor(
        private readonly wordsService: WordsService,
        private readonly dailyStatisticsService: DailyStatisticsService,
        private readonly changeDetector: ChangeDetectorRef,
        private readonly percentPipe: PercentPipe
    ) { }

    /**
     * Инициализация компонента
     */
    public ngOnInit(): void {
        this.loadRandomWord();
        this.loadDailyStatistics();
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
            .subscribe(_ => this.loadRandomWord());
    }

    /**
     * Загружает новое рандомное слово
     */
    private loadRandomWord(): void {
        this.Loaded = false;

        this.wordsService.getRandomWord()
            .pipe(
                takeUntil(this.destructor$),
                finalize(() => this.Loaded = true)
            )
            .subscribe(res => this.Word = res);
    }

    /**
     * Загружает дневную статистику
     */
    private loadDailyStatistics(): void {
        this.dailyStatisticsService.getDailyStatistics()
            .pipe(takeUntil(this.destructor$))
            .subscribe(res => this.DailyStatistics = res);
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
