export class Availability {

  public date: string
  public hoursList: AvailabilityHours[]

  public constructor(date: Date, hoursList: AvailabilityHours[]) {
    this.date = date.toLocaleDateString('pl-PL', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});
    this.hoursList = hoursList;
  }
}

export class AvailabilityDto {

  public startDate: Date
  public endDate: Date


  constructor(startDate: Date, endDate: Date) {
    this.startDate = startDate;
    this.endDate = endDate;
  }
}

export class AvailabilityHours {

  public startHour: string
  public endHour: string

  public constructor(startHour: string, endHour: string) {
    this.startHour = startHour;
    this.endHour = endHour
  }

  public toString() {
    return this.startHour + " - " + this.endHour
  }

}
