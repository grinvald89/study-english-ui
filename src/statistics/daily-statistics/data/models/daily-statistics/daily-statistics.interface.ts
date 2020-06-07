import { WordDTO } from 'src/app/shared/models/word-dto/word-dto';

/**
 * Интерфейс для отображения дневной статистики
 */
export interface IDailyStatistics {
    id: number;
    date: string;
    success: boolean;
    word: WordDTO;
}
