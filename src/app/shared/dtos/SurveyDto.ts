import {SurveyState} from "../enums/survey-state";

export class SurveyDto {

  public id: number;
  public code: string;
  public date: Date;
  public surveyState: SurveyState = SurveyState.UNUSED;
  public eventId: number;

  constructor(id: number,
              code: string,
              date: Date,
              surveyState: SurveyState,
              eventId: number) {
    this.id = id;
    this.code = code;
    this.date = new Date(date);
    this.surveyState = surveyState
    this.eventId = eventId;
  }
}
