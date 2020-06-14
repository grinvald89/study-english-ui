import * as moment from 'moment';

import { IStudyHistoryDTO } from './study-history-dto.interface';

/**
 * Хранит историю изучения слова
 */
export class StudyHistoryDTO implements IStudyHistoryDTO {
    readonly id?: number;
    correct: boolean;
    showAssociation: boolean;
    date: moment.Moment;

    constructor(data?: IStudyHistoryDTO) {
        if (data) {
            this.id = data.id;
            this.correct = data.correct;
            this.showAssociation = data.showAssociation;
            this.date = data.date;
        }
    }
}
