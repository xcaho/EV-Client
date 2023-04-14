export class EventDto {

  private name: string
  private description: string
  private startDate: string
  private endDate: string
  private maxUsers: number
  private duration: number
  private breakTime: number

  public constructor(name: string, description: string, startDate: string, endDate: string, maxUsers: number, duration: number, breakTime: number) {
    this.name = name;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.maxUsers = maxUsers;
    this.duration = duration;
    this.breakTime = breakTime;
  }
}
