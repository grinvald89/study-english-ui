import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicStatisticsComponent } from './graphic-statistics.component';

describe('GraphicStatisticsComponent', () => {
    let component: GraphicStatisticsComponent;
    let fixture: ComponentFixture<GraphicStatisticsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GraphicStatisticsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GraphicStatisticsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
