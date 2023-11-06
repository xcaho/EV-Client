import {DateValidator} from './date-validator';
import {FormControl} from "@angular/forms";

describe('DateValidator', () => {
  it('should create an instance', () => {
    const control = new FormControl('');
    expect(DateValidator(control)).toBeNull();
  });
});
