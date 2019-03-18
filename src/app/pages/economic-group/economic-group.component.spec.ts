import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EconomicGroupComponent } from './economic-group.component';

describe('EconomicGroupComponent', () => {
  let component: EconomicGroupComponent;
  let fixture: ComponentFixture<EconomicGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EconomicGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EconomicGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
