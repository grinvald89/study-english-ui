import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/shared/material.module';
import { AddWordPageRoutingModule } from './add-word-page-routing.module';
import { AddWordPageComponent } from '../ui/add-word-page/add-word-page.component';

/**
 * Модуль для отображения страницы добавления слов
 */
@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        AddWordPageRoutingModule,
    ],
    declarations: [AddWordPageComponent]
})
export class AddWordPageModule { }
