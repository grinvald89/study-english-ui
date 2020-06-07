/**
 * Описывает перевод слова.
 */
export interface ITranslateDTO {
    /**
     * Идентификатор перевода.
     */
    readonly id?: number;

    /**
     * Идентификатор слова, которому принадлежит перевод.
     */
    wordId?: number;

    /**
     * Текст перевода.
     */
    text: string;

    /**
     * True, если это основное значение (перевод) слова.
     */
    isPrimary: boolean;
}
