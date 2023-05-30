import { AvailabilityService} from "./availability.service";
import { HttpClient } from '@angular/common/http';

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
    const events = [
      {id:0, name: 'test1', description: '', researchStartDate:'', researchEndDate:'', endDate:'', maxUsers:3, slotsTaken:5, surveyDuration: 60, surveyBreakTime: 30 },
    ];
    const eventId = 0;

    const expectedRanges = [ '11:30-12:30'];

    const result = availabilityService.updateAvailableHours(hoursList, hoursChoice, events, eventId);

    expect(result).toEqual(expectedRanges);
  });

  it('should return single hour when no ranges can be created', () => {
    const hoursList = ['09:00', '09:30', '10:00'];
    const hoursChoice = '09:00';
    const events = [{id:0, name: 'test1', description: '', researchStartDate:'', researchEndDate:'', endDate:'', maxUsers:3, slotsTaken:5, surveyDuration: 30, surveyBreakTime: 30 }];
    const eventId = 0;

    const expectedRanges = ['10:00'];

    const result = availabilityService.updateAvailableHours(hoursList, hoursChoice, events, eventId);

    expect(result).toEqual(expectedRanges);
  });
});
