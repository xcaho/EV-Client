export class SurveyDto {

  public id: number

  public code: string

  public date: Date

  public eventId: number

  constructor(id: number, code: string, date: Date, eventId: number) {
    this.id = id;
    this.code = code;
    this.date = date;
    this.eventId = eventId;
  }
}
