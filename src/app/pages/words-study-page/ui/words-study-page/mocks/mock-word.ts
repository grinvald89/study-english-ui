import { WordDTO } from 'src/app/shared/models/word-dto/word-dto';

export const MOCK_WORD: WordDTO = new WordDTO({
    id: 1,
    text: 'keep',
    transcription: 'kēp',
    translate: [
        {
            id: 1,
            wordId: 1,
            text: 'Хранить',
            isPrimary: true
        }
    ],
    association: 'Текст ассоциации',
    audio: []
});
