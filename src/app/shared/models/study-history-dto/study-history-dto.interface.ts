import * as moment from 'moment';

/**
 * Хранит историю изучения слова
 */
export interface IStudyHistoryDTO {
    /**
     * Идентификатор
     */
    readonly id?: number;

    /**
     * True, если ответ был правильный
     */
    correct: boolean;

    /**
     * True, если была показана ассоциация
     */
    showAssociation: boolean;

    /**
     * Дата ответа
     */
    date: moment.Moment;
}
