export class SurveyDto {

  public id: number

  public code: string

  public date: Date

  public surveyState: SurveyState = SurveyState.UNUSED

  public eventId: number

  constructor(id: number, code: string, date: Date, surveyState: SurveyState, eventId: number) {
    this.id = id;
    this.code = code;
    this.date = new Date(date);
    this.surveyState = surveyState
    this.eventId = eventId;
  }

  public getDateFormatted(): string {
    if (this.date.toISOString() == new Date(0).toISOString()) {
      return "-"
    }

    return this.date.toLocaleDateString('pl-PL', {year: 'numeric', month: 'long', day: 'numeric',
      hour: "2-digit", minute: "2-digit"});
  }
}

export enum SurveyState {
  UNUSED = 'UNUSED',
  USED = 'USED',
  INACTIVE = 'INACTIVE'
}
