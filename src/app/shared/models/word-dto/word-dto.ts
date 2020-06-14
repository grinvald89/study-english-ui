import { IWordDTO } from './word-dto.interface';
import { TranslateDTO } from '../translate-dto/translate-dto';
import { AudioDTO } from '../audio-dto/audio-dto';
import { StaticticsDTO } from '../statictics-dto/statictics-dto';
import { StudyHistoryDTO } from '../study-history-dto/study-history-dto';

/**
 * Хранит параметры слова.
 */
export class WordDTO implements IWordDTO {
    readonly id?: number;
    text: string;
    translate: TranslateDTO[];
    transcription: string;
    association: string;
    audio: AudioDTO[];
    statistics: StaticticsDTO;
    studyHistory: StudyHistoryDTO;

    constructor(data?: IWordDTO) {
        if (data) {
            this.id = data.id;
            this.text = data.text;
            this.translate = data.translate;
            this.transcription = data.transcription;
            this.association = data.association;
            this.audio = data.audio;
            this.statistics = data.statistics;
            this.studyHistory = data.studyHistory;
        }
    }
}
