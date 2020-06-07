import * as moment from 'moment';

/**
 * Хранит историю изучения слова
 */
export interface IStudyHistory {
    /**
     * Идентификатор
     */
    readonly id: number;

    /**
     * True, если ответ был правильный
     */
    correct: boolean;

    /**
     * Дата ответа
     */
    dateTime: moment.Moment;
}