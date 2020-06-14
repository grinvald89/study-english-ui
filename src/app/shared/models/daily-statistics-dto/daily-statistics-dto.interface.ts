import { TranslateDTO } from '../translate-dto/translate-dto';
import { WordDTO } from '../word-dto/word-dto';
import { StudyHistoryDTO } from '../study-history-dto/study-history-dto';

/**
 * Описывает параметры дневной статистики.
 */
export interface IDailyStatisticsDTO {
    readonly word: WordDTO;
    readonly studyHistory: StudyHistoryDTO;
    time?: string;
}
