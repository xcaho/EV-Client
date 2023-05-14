export class AvailabilityDto {

  public dayOfWeek: string
  public date: string
  public hoursList: AvailabilityHours[]

  public constructor(dayOfWeek: string, date: string, hoursList: AvailabilityHours[]) {
    this.dayOfWeek = dayOfWeek;
    this.date = date;
    this.hoursList = hoursList
  }
}

export class AvailabilityHours {

  public startHour: string
  public endHour: string

  public constructor(startHour: string, endHour: string) {
    this.startHour = startHour;
    this.endHour = endHour
  }

}
