import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PasswordRemindComponent} from './password-remind.component';

describe('PasswordRemindComponent', () => {
  let component: PasswordRemindComponent;
  let fixture: ComponentFixture<PasswordRemindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasswordRemindComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PasswordRemindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
