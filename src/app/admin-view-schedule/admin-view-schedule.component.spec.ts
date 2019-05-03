import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewScheduleComponent } from './admin-view-schedule.component';

describe('AdminViewScheduleComponent', () => {
  let component: AdminViewScheduleComponent;
  let fixture: ComponentFixture<AdminViewScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminViewScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
