import { IFormValue } from './form-value.interface';

/**
 * Хранит значение формы
 */
export class FormValue implements IFormValue {
    text: string;
    translates: string;
    privateTranslateIndex: number;
    transcription: string;
    association: string;
    audio: string;

    constructor(data?: IFormValue) {
        if (data) {
            this.text = data.text;
            this.translates = data.translates;
            this.privateTranslateIndex = data.privateTranslateIndex;
            this.transcription = data.transcription;
            this.association = data.association;
            this.audio = data.audio;
        }
    }
}
