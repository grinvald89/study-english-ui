import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppConfigService } from 'src/app/app-config/app-config.service';
import { WordDTO } from 'src/app/shared/models/word-dto/word-dto';

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
}
