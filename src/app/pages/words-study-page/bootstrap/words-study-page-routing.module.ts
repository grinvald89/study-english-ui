import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WordsStudyPageComponent } from '../ui/words-study-page/words-study-page.component';

const routes: Routes = [{
    path: '',
    component: WordsStudyPageComponent
}];

/**
 * Модуль маршрутизации страницы изучения слов
 */
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WordsStudyPageRoutingModule { }
