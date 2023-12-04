import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewConsentModalComponent } from './view-consent-modal.component';

describe('ViewConsentModalComponent', () => {
  let component: ViewConsentModalComponent;
  let fixture: ComponentFixture<ViewConsentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewConsentModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewConsentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
