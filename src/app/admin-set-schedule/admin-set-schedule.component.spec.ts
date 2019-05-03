import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSetScheduleComponent } from './admin-set-schedule.component';

describe('AdminSetScheduleComponent', () => {
  let component: AdminSetScheduleComponent;
  let fixture: ComponentFixture<AdminSetScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSetScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSetScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
