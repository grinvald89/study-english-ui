import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWordPageComponent } from './add-word-page.component';

describe('AddWordPageComponent', () => {
    let component: AddWordPageComponent;
    let fixture: ComponentFixture<AddWordPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddWordPageComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddWordPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
