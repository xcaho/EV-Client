import { AvailabilityService} from "./availability.service";
import { HttpClient } from '@angular/common/http';
import {EventDto} from "./common/mainpage/EventDto";

describe('AvailabilityService', () => {
  let availabilityService: AvailabilityService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    availabilityService = new AvailabilityService(httpClientSpy);
  });

  it('should return correct ranges', () => {
    const hoursList = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30'];
    const hoursChoice = '10:00';
    const events = new EventDto('test1', 'test1', '', '', '', 3, 60, 30, 5);

    const expectedRanges = [ '11:30-12:30'];

    const result = availabilityService.updateAvailableHours(hoursList, hoursChoice, events);

    expect(result).toEqual(expectedRanges);
  });

  it('should return single hour when no ranges can be created', () => {
    const hoursList = ['09:00', '09:30', '10:00'];
    const hoursChoice = '09:00';
    const events = new EventDto('test1', 'test1', '', '', '', 3, 30, 30, 5);

    const expectedRanges = ['10:00'];

    const result = availabilityService.updateAvailableHours(hoursList, hoursChoice, events);

    expect(result).toEqual(expectedRanges);
  });
});
