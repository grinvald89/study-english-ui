import { IStaticticsDTO } from './statictics-dto.interface';

/**
 * Хранит статистику по изучению слова
 */
export class StaticticsDTO implements IStaticticsDTO {
    readonly id?: number;
    countShow: number;
    correctness: number;
    dateLastShow: moment.Moment;

    constructor(data?: IStaticticsDTO) {
        if (data) {
            this.id = data.id;
            this.countShow = data.countShow;
            this.correctness = data.correctness;
            this.dateLastShow = data.dateLastShow;
        }
    }
}
