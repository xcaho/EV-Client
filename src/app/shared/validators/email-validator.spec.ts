import {EmailValidator} from './email-validator';
import {FormControl} from "@angular/forms";

describe('EmailValidator', () => {
  it('should create an instance', () => {
    const control = new FormControl('');
    expect(EmailValidator(control)).toBeNull();
  });
});
