import { IAudioDTO } from './audio-dto.interface';

/**
 * Хранит параметры аудио-файла
 */
export class AudioDTO implements IAudioDTO {
    readonly id?: number;
    url: string;
    wordId?: number;

    constructor(data?: IAudioDTO) {
        if (data) {
            this.id = data.id;
            this.url = data.url;
            this.wordId = data.wordId;
        }
    }
}
