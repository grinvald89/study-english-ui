import { IDailyStatistics } from './daily-statistics.interface';
import { WordDTO } from 'src/app/shared/models/word-dto/word-dto';

/**
 * Класс для отображения дневной статистики
 */
export class DailyStatistics implements IDailyStatistics {
    id: number;
    date: string;
    success: boolean;
    word: WordDTO;

    constructor(data?: IDailyStatistics) {
        if (data) {
            this.id = data.id;
            this.date = data.date;
            this.success = data.success;
            this.word = data.word;
        }
    }
}
