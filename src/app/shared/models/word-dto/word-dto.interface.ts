import { TranslateDTO } from '../translate-dto/translate-dto';
import { AudioDTO } from '../audio-dto/audio-dto';

/**
 * Описывает параметры слова.
 */
export interface IWordDTO {
    /**
     * Идентификатор слова.
     */
    readonly id?: number;

    /**
     * Текст слова.
     */
    text: string;

    /**
     * Перевод слова.
     */
    translate: TranslateDTO[];

    /**
     * Транскрипция.
     */
    transcription: string;

    /**
     * Ассоциация
     */
    association: string;

    /**
     * Аудио-файлы
     */
    audio: AudioDTO[];
}
