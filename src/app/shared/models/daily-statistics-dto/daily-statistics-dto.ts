import { IDailyStatisticsDTO } from './daily-statistics-dto.interface';
import { WordDTO } from '../word-dto/word-dto';
import { StudyHistoryDTO } from '../study-history-dto/study-history-dto';

/**
 * Хранит параметры дневной статистики.
 */
export class DailyStatisticsDTO implements IDailyStatisticsDTO {
    readonly word: WordDTO;
    readonly studyHistory: StudyHistoryDTO;
    time?: string;

    constructor(data?: IDailyStatisticsDTO) {
        if (data) {
            this.word = data.word;
            this.studyHistory = data.studyHistory;
        }
    }
}
