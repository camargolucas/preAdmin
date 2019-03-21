import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateManagerAccountDialogComponent } from './create-manager-account-dialog.component';

describe('CreateManagerAccountDialogComponent', () => {
  let component: CreateManagerAccountDialogComponent;
  let fixture: ComponentFixture<CreateManagerAccountDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateManagerAccountDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateManagerAccountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
