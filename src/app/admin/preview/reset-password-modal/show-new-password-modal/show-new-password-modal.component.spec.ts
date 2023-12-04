import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowNewPasswordModalComponent } from './show-new-password-modal.component';

describe('ShowNewPasswordModalComponent', () => {
  let component: ShowNewPasswordModalComponent;
  let fixture: ComponentFixture<ShowNewPasswordModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowNewPasswordModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowNewPasswordModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
