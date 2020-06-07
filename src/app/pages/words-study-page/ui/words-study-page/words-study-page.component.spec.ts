import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsStudyPageComponent } from './words-study-page.component';

describe('WordsStudyPageComponent', () => {
    let component: WordsStudyPageComponent;
    let fixture: ComponentFixture<WordsStudyPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WordsStudyPageComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WordsStudyPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
