/**
 * Описывает параметры аудио-файла
 */
export interface IAudioDTO {
    /**
     * Идентификатор аудио-файла
     */
    readonly id?: number;
    /**
     * Путь к аудио-файлу
     */
    url: string;

    /**
     * Идентификатор слова, которому принадлежит аудио-файл
     */
    wordId?: number;
}
