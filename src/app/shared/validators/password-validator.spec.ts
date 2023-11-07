import {PasswordValidator} from './password-validator';
import {FormControl} from "@angular/forms";

describe('PasswordValidator', () => {
  it('should create an instance', () => {
    const control = new FormControl('');
    expect(PasswordValidator(control)).toBeNull();
  });
});
