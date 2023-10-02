import { AvailabilityService} from "./availability.service";
import { HttpClient } from '@angular/common/http';
import {EventDto} from "./shared/dtos/EventDto";
import { Availability, AvailabilityHours } from "./shared/dtos/Availability";

describe('AvailabilityService', () => {
  let availabilityService: AvailabilityService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    availabilityService = new AvailabilityService(httpClientSpy);
  });

  describe("updateAvailableHours", () => {
    it("should update the available hours based on selected hour and day", () => {
      // Arrange
      const hoursList = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00"];
      const selectedHour = "09:00";
      const selectedDay = "2023-06-11";
      const availabilities: Availability[] = [
        new Availability(new Date("2023-06-11"), [
          new AvailabilityHours("09:00", "10:00"),
          new AvailabilityHours("10:30", "12:00")
        ])
      ];
      const event: EventDto = new EventDto(
        "Event",
        "Event description",
        "2023-06-11",
        "2023-06-12",
        "2023-06-11",
        10,
        30,
        30,
        0
      );
      const endHours = ["10:00", "12:00"];

      // Act
      const updatedAvailabilities = availabilityService.updateAvailableHours(
        hoursList,
        selectedHour,
        selectedDay,
        availabilities,
        event,
        endHours
      );

      // Assert
      expect(updatedAvailabilities[0].hoursList.length).toBe(1);
      expect(updatedAvailabilities[0].hoursList[0].startHour).toBe("10:30");
      expect(updatedAvailabilities[0].hoursList[0].endHour).toBe("12:00");
    });

    it("should correctly update the available hours when the selected hour is at the beginning of a range", () => {
      // Arrange
      const hoursList = ["08:00", "08:30","09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00"];
      const selectedHour = "08:00"; // Outside survey duration range
      const selectedDay = "2023-06-11";
      const availabilities: Availability[] = [
        new Availability(new Date("2023-06-11"), [
          new AvailabilityHours("08:00", "10:00"),
          new AvailabilityHours("10:30", "13:00")
        ])
      ];
      const event: EventDto = new EventDto(
        "Event",
        "Event description",
        "2023-06-11",
        "2023-06-12",
        "2023-06-11",
        10,
        60,
        30,
        0
      );
      const endHours = ["10:00", "13:00"];

      // Act
      const updatedAvailabilities = availabilityService.updateAvailableHours(
        hoursList,
        selectedHour,
        selectedDay,
        availabilities,
        event,
        endHours
      );

      // Assert
      expect(updatedAvailabilities[0].hoursList.length).toBe(1);
      expect(updatedAvailabilities[0].hoursList[0].startHour).toBe("10:30");
      expect(updatedAvailabilities[0].hoursList[0].endHour).toBe("13:00");
    });

    it("should correctly update the available hours when the selected hour is at the end of a range", () => {
      // Arrange
      const hoursList = ["08:00", "08:30","09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00"];
      const selectedHour = "11:30"; // Outside survey duration range
      const selectedDay = "2023-06-11";
      const availabilities: Availability[] = [
        new Availability(new Date("2023-06-11"), [
          new AvailabilityHours("08:00", "10:00"),
          new AvailabilityHours("10:30", "13:00")
        ])
      ];
      const event: EventDto = new EventDto(
        "Event",
        "Event description",
        "2023-06-11",
        "2023-06-12",
        "2023-06-11",
        10,
        60,
        30,
        0
      );
      const endHours = ["10:00", "13:00"];

      // Act
      const updatedAvailabilities = availabilityService.updateAvailableHours(
        hoursList,
        selectedHour,
        selectedDay,
        availabilities,
        event,
        endHours
      );

      // Assert
      expect(updatedAvailabilities[0].hoursList.length).toBe(1);
      expect(updatedAvailabilities[0].hoursList[0].startHour).toBe("08:00");
      expect(updatedAvailabilities[0].hoursList[0].endHour).toBe("10:00");
    });

    it("should exclude single hours from available ranges", () => {
      // Arrange
      const hoursList = ["13:00", "13:30", "14:00", "14:30", "15:00", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"];
      const selectedHour = "18:30";
      const selectedDay = "2023-06-11";
      const availabilities: Availability[] = [
        new Availability(new Date("2023-06-11"), [
          new AvailabilityHours("13:00", "15:00"),
          new AvailabilityHours("17:00", "20:00")
        ]),
      ];
      const event: EventDto = new EventDto(
        "Event",
        "Event description",
        "2023-06-11",
        "2023-06-12",
        "2023-06-11",
        10,
        60,
        30,
        0
      );
      const endHours = ["15:00", "20:00"];

      // Act
      const updatedAvailabilities = availabilityService.updateAvailableHours(
        hoursList,
        selectedHour,
        selectedDay,
        availabilities,
        event,
        endHours
      );

      // Assert
      expect(updatedAvailabilities[0].hoursList.length).toBe(1);
      expect(updatedAvailabilities[0].hoursList[0].startHour).toBe("13:00");
      expect(updatedAvailabilities[0].hoursList[0].endHour).toBe("15:00");
    });

    it("should not update availabilities when choosed hour is not in available hoursList", () => {
      // Arrange
      const hoursList = ["13:00", "13:30", "14:00", "14:30", "15:00", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"];
      const selectedHour = "11:30";
      const selectedDay = "2023-06-11";
      const availabilities: Availability[] = [
        new Availability(new Date("2023-06-11"), [
          new AvailabilityHours("13:00", "15:00"),
          new AvailabilityHours("17:00", "20:00")
        ]),
      ];
      const event: EventDto = new EventDto(
        "Event",
        "Event description",
        "2023-06-11",
        "2023-06-12",
        "2023-06-11",
        10,
        60,
        30,
        0
      );
      const endHours = ["15:00", "20:00"];

      // Act
      const updatedAvailabilities = availabilityService.updateAvailableHours(
        hoursList,
        selectedHour,
        selectedDay,
        availabilities,
        event,
        endHours
      );

      // Assert
      expect(updatedAvailabilities[0].hoursList.length).toBe(2);
      expect(updatedAvailabilities[0].hoursList[0].startHour).toBe("13:00");
      expect(updatedAvailabilities[0].hoursList[0].endHour).toBe("15:00");
      expect(updatedAvailabilities[0].hoursList[1].startHour).toBe("17:00");
      expect(updatedAvailabilities[0].hoursList[1].endHour).toBe("20:00");
    });

    it("should corectly update available hour ranges based on choosed hour", () => {
      // Arrange
      const hoursList = ["08:00", "08:30","09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00"];
      const selectedHour = "11:00"; // Outside survey duration range
      const selectedDay = "2023-06-11";
      const availabilities: Availability[] = [
        new Availability(new Date("2023-06-11"), [
          new AvailabilityHours("08:00", "14:00"),
        ]),
      ];
      const event: EventDto = new EventDto(
        "Event",
        "Event description",
        "2023-06-11",
        "2023-06-12",
        "2023-06-11",
        10,
        60,
        30,
        0
      );
      const endHours = ["14:00"];

      // Act
      const updatedAvailabilities = availabilityService.updateAvailableHours(
        hoursList,
        selectedHour,
        selectedDay,
        availabilities,
        event,
        endHours
      );

      // Assert
      expect(updatedAvailabilities[0].hoursList.length).toBe(2);
      expect(updatedAvailabilities[0].hoursList[0].startHour).toBe("08:00");
      expect(updatedAvailabilities[0].hoursList[0].endHour).toBe("09:30");
      expect(updatedAvailabilities[0].hoursList[1].startHour).toBe("12:30");
      expect(updatedAvailabilities[0].hoursList[1].endHour).toBe("14:00");
    });

    it("should not merge two hour ranges, if they have 30min break between them", () => {
      // Arrange
      const hoursList = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
        "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00"];
      const selectedHour = "08:00";
      const selectedDay = "2023-06-11";
      const availabilities: Availability[] = [
        new Availability(new Date("2023-06-11"), [
          new AvailabilityHours("08:00", "14:00"),
          new AvailabilityHours("14:30", "19:00")
        ]),
      ];
      const event: EventDto = new EventDto(
        "Event",
        "Event description",
        "2023-06-11",
        "2023-06-12",
        "2023-06-11",
        10,
        60,
        30,
        0
      );
      const endHours = ["14:00", "19:00"];

      // Act
      const updatedAvailabilities = availabilityService.updateAvailableHours(
        hoursList,
        selectedHour,
        selectedDay,
        availabilities,
        event,
        endHours
      );

      // Assert
      expect(updatedAvailabilities[0].hoursList.length).toBe(2);
      expect(updatedAvailabilities[0].hoursList[0].startHour).toBe("09:30");
      expect(updatedAvailabilities[0].hoursList[0].endHour).toBe("14:00");
      expect(updatedAvailabilities[0].hoursList[1].startHour).toBe("14:30");
      expect(updatedAvailabilities[0].hoursList[1].endHour).toBe("19:00");
    });
  });
});
