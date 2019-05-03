import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestOffPageComponent } from './request-off-page.component';

describe('RequestOffPageComponent', () => {
  let component: RequestOffPageComponent;
  let fixture: ComponentFixture<RequestOffPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestOffPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestOffPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
