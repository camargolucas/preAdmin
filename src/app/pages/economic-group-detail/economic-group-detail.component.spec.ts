import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EconomicGroupDetailComponent } from './economic-group-detail.component';

describe('EconomicGroupDetailComponent', () => {
  let component: EconomicGroupDetailComponent;
  let fixture: ComponentFixture<EconomicGroupDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EconomicGroupDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EconomicGroupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
