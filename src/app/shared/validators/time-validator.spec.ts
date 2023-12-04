import {TimeValidator} from './time-validator';
import {FormControl} from "@angular/forms";

describe('TimeValidator', () => {
  it('should create an instance', () => {
    const control = new FormControl('');
    expect(TimeValidator(control)).toBeNull();
  });
});
