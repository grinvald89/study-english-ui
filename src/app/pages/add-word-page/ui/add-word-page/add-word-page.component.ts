import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { isEmpty } from 'lodash';
import swal from 'sweetalert2';

import { WordDTO } from 'src/app/shared/models/word-dto/word-dto';
import { AudioDTO } from 'src/app/shared/models/audio-dto/audio-dto';
import { TranslateDTO } from 'src/app/shared/models/translate-dto/translate-dto';
import { FormValue } from './form-value/form-value';
import { WordsService } from '../../data/words.service';
import { WORDS } from '../../data/words';

/**
 * Компонент для отображения страницы добавления слов
 */
@Component({
    selector: 'add-word-page',
    templateUrl: './add-word-page.component.html',
    styleUrls: ['./add-word-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddWordPageComponent implements OnInit, OnDestroy {
    private loaded: boolean = true;
    private word: WordDTO = new WordDTO();
    private translates: string[] = [];

    private form: FormGroup = new FormGroup({
        text: new FormControl(null, Validators.required),
        translates: new FormControl(null, Validators.required),
        privateTranslateIndex: new FormControl(null, Validators.required),
        transcription: new FormControl(null, Validators.required),
        association: new FormControl(null, Validators.required),
        audio: new FormControl(null, Validators.required)
    });

    private destructor$: Subject<boolean> = new Subject<boolean>();

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
    }

    get Translates(): string[] {
        return this.translates.filter(i => !isEmpty(i));
    }
    set Translates(value: string[]) {
        if (Array.isArray(value)) {
            this.translates = value.filter(i => !isEmpty(i));
        } else {
            this.translates = [];
        }
    }

    get Form(): FormGroup {
        return this.form;
    }

    constructor(
        private readonly wordsService: WordsService,
        private readonly changeDetector: ChangeDetectorRef
    ) { }

    /**
     * Инициализация компонента
     */
    ngOnInit() {
        // this.addWordsFromAppConst();

        this.Form.valueChanges
            .pipe(takeUntil(this.destructor$))
            .subscribe((formValue: FormValue) => {
                this.updateTranslates(formValue);
                this.updatePrivateTranslateIndex(formValue);
                this.updateWord(formValue);
            });
    }

    /**
     * Деструктор компонента
     */
    public ngOnDestroy(): void {
        this.destructor$.next(true);
        this.destructor$.complete();
    }

    /**
     * Отправляет слово на сервер
     */
    public sendWord(): void {
        this.Loaded = false;

        this.wordsService.addWord(this.Word)
            .pipe(
                takeUntil(this.destructor$),
                finalize(() => this.Loaded = true)
            )
            .subscribe(
                word => this.Word = word,
                err => swal.fire(
                    'Ошибка!',
                    'Во время добавления слова произошла ошибка!',
                    'error'
                )
            );
    }

    /**
     * Очищает форму
     */
    public resetForm(): void {
        this.Form.reset();
    }

    /**
     * Обновляет слово
     */
    private updateWord(formValue: FormValue): void {
        this.Word.text = formValue.text;
        this.Word.transcription = formValue.transcription;
        this.Word.association = formValue.association;
        this.Word.audio = this.getAudioFromFormValue(formValue);
        this.Word.translate = this.getTranslateFromFormValue(formValue);
    }

    /**
     * Возвращает список Audio-файлов из формы
     */
    private getAudioFromFormValue(formValue: FormValue): AudioDTO[] {
        const result: AudioDTO[] = [];
        const isAudioString: boolean = typeof formValue.audio === 'string';

        const audioUrls: string[] = isAudioString
            ? formValue.audio.split('\n')
            : [];

        audioUrls.forEach(item => {
            if (!isEmpty(item)) {
                result.push(new AudioDTO({
                    url: item
                }));
            }
        });

        return result;
    }

    /**
     * Возвращает список переводов из формы
     */
    private getTranslateFromFormValue(formValue: FormValue): TranslateDTO[] {
        const result: TranslateDTO[] = [];

        if (Array.isArray(this.Translates)) {
            this.Translates.forEach((translate: string, index: number) =>
                result.push(new TranslateDTO({
                    isPrimary: index === formValue.privateTranslateIndex,
                    text: translate
                })));
        }

        return result;
    }

    /**
     * Обновляет список переводов
     */
    private updateTranslates(formValue: FormValue): void {
        const isTranslatesString: boolean = typeof formValue.translates === 'string';

        this.Translates = isTranslatesString
            ? formValue.translates.split('\n')
            : [];
    }

    /**
     * Обновляет индекс основного перевода
     */
    private updatePrivateTranslateIndex(formValue: FormValue): void {
        if (!Array.isArray(this.Translates) || !this.Translates.length) {
            this.Form.controls.privateTranslateIndex.setValue(0, { emitEvent: false });
            this.Translates = [];
            return;
        }

        if (
            !formValue.privateTranslateIndex ||
            formValue.privateTranslateIndex >= this.Translates.length
        ) {
            this.Form.controls.privateTranslateIndex.setValue(0, { emitEvent: false });
        }
    }

    private addWordsFromAppConst(word?: WordDTO): void {
        if (word === undefined) {
            word = WORDS[0];
        }

        this.wordsService.addWord(word)
            .pipe(takeUntil(this.destructor$))
            .subscribe(res => {
                const wordIndex: number = WORDS.findIndex(i => i.text === word?.text);

                if (wordIndex < WORDS.length - 1) {
                    this.addWordsFromAppConst(WORDS[wordIndex + 1]);
                }
            });
    }
}
