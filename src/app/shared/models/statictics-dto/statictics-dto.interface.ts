import * as moment from 'moment';

/**
 * Описывает статистику по изучению слова
 */
export interface IStaticticsDTO {
    /**
     * Идентификатор
     */
    readonly id: number;

    /**
     * Количество показов
     */
    countShow: number;

    /**
     * Процент правильных ответов
     */
    correctness: number;

    /**
     * Дата последнего показа
     */
    dateLastShow: moment.Moment;
}
