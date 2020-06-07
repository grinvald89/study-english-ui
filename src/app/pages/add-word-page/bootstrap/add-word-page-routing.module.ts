import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddWordPageComponent } from '../ui/add-word-page/add-word-page.component';

const routes: Routes = [{
    path: '',
    component: AddWordPageComponent
}];

/**
 * Модуль маршрутизации страницы добавления слов
 */
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddWordPageRoutingModule { }
