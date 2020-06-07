import { TranslateDTO } from 'src/app/shared/models/translate-dto/translate-dto';

export const MOCK_ANSWERS: TranslateDTO[] = [
    new TranslateDTO({
        id: 2,
        wordId: 2,
        text: 'держать',
        isPrimary: true
    }),
    new TranslateDTO({
        id: 3,
        wordId: 3,
        text: 'нести',
        isPrimary: true
    }),
    new TranslateDTO({
        id: 4,
        wordId: 4,
        text: 'карандаш',
        isPrimary: true
    }),
    new TranslateDTO({
        id: 5,
        wordId: 5,
        text: 'стол',
        isPrimary: true
    }),
    new TranslateDTO({
        id: 6,
        wordId: 6,
        text: 'бежать',
        isPrimary: true
    }),
    new TranslateDTO({
        id: 7,
        wordId: 7,
        text: 'злиться',
        isPrimary: true
    })
];
