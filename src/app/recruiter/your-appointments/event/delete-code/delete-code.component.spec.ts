import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCodeComponent } from './delete-code.component';

describe('DeleteCodeComponent', () => {
  let component: DeleteCodeComponent;
  let fixture: ComponentFixture<DeleteCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
