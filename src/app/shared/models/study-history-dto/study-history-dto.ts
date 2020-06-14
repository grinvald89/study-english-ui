import { IStudyHistoryDTO } from './study-history-dto.interface';

/**
 * Хранит историю изучения слова
 */
export class StudyHistoryDTO implements IStudyHistoryDTO {
    readonly id?: number;
    correct: boolean;
    date: moment.Moment;

    constructor(data?: IStudyHistoryDTO) {
        if (data) {
            this.id = data.id;
            this.correct = data.correct;
            this.date = data.date;
        }
    }
}
