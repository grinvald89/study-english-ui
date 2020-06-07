import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AddWordPageModule } from './pages/add-word-page/bootstrap/add-word-page.module';
import { WordsStudyPageModule } from './pages/words-study-page/bootstrap/words-study-page.module';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/words-study',
        pathMatch: 'full'
    },
    {
        path: '',
        component: AppComponent,
        children: [
            {
                path: 'words-study',
                loadChildren: './pages/words-study-page/bootstrap/words-study-page.module#WordsStudyPageModule'
            },
            {
                path: 'add-word',
                loadChildren: './pages/add-word-page/bootstrap/add-word-page.module#AddWordPageModule'
            }
        ]
    }

];

@NgModule({
    imports: [
        WordsStudyPageModule,
        AddWordPageModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
