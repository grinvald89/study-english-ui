import { ITranslateDTO } from './translate-dto.interface';

/**
 * Хранит перевод слова.
 */
export class TranslateDTO implements ITranslateDTO {
    readonly id?: number;
    wordId?: number;
    text: string;
    isPrimary: boolean;

    constructor(data?: ITranslateDTO) {
        if (data) {
            this.id = data.id;
            this.wordId = data.wordId;
            this.text = data.text;
            this.isPrimary = data.isPrimary;
        }
    }
}
