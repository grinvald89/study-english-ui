import { IStudyHistory } from './study-history-dto.interface';

/**
 * Хранит историю изучения слова
 */
export class StudyHistory implements IStudyHistory {
    readonly id: number;
    correct: boolean;
    dateTime: moment.Moment;

    constructor(data?: IStudyHistory) {
        if (data) {
            this.id = data.id;
            this.correct = data.correct;
            this.correct = data.correct;
        }
    }
}
