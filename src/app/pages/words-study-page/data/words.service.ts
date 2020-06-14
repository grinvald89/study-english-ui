import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { AppConfigService } from 'src/app/app-config/app-config.service';
import { WordDTO } from 'src/app/shared/models/word-dto/word-dto';
import { TranslateDTO } from 'src/app/shared/models/translate-dto/translate-dto';
import { StudyHistoryDTO } from 'src/app/shared/models/study-history-dto/study-history-dto';

@Injectable({
    providedIn: 'root'
})
export class WordsService {
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
    public getRandomWord(): Observable<WordDTO> {
        return this.http.get<WordDTO>(`${this.Url}api/randomword`);
    }

    /**
     * Возвращает варианты ответы для слова
     * @param wordId - идентификатор слова
     */
    public getAnswersByWordId(wordId: number): Observable<TranslateDTO[]> {
        return this.http.get<TranslateDTO[]>(`${this.Url}api/answerwords/${wordId}`);
    }

    /**
     * Отправляет выбранный вариант ответа
     * @param wordId - идентификатор слова
     * @param isCorrect - идентификатор слова
     */
    public sendAnswers(wordId: number, isCorrect: boolean): Observable<StudyHistoryDTO> {
        const header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.post<StudyHistoryDTO>(
            `${this.Url}api/studyhistory`,
            {
                WordId: wordId,
                Correct: isCorrect,
            },
            {
                headers: header
            }
        );
    }
}
