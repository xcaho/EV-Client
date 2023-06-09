export class SurveyDto {

  public id: number

  public code: string

  public date: Date

  public surveyState: SurveyState = SurveyState.UNDEFINED

  public eventId: number

  constructor(id: number, code: string, date: Date, surveyState: SurveyState, eventId: number) {
    this.id = id;
    this.code = code;
    this.date = date;
    this.surveyState = surveyState
    this.eventId = eventId;
  }
}

enum SurveyState {
  UNDEFINED = 'UNDEFINED',
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  INACTIVE = 'INACTIVE'

}
