export class EventDto {

  private name: string
  private description: string
  private researchStartDate: string
  private researchEndDate: string
  private endDate: string
  private maxUsers: number
  private surveyDuration: number
  private surveyBreakTime: number

  public constructor(name: string, description: string, researchStartDate: string, researchEndDate: string, endDate: string, maxUsers: number, surveyDuration: number, surveyBreakTime: number) {
    this.name = name;
    this.description = description;
    this.researchStartDate = researchStartDate;
    this.researchEndDate = researchEndDate;
    this.endDate = endDate;
    this.maxUsers = maxUsers;
    this.surveyDuration = surveyDuration;
    this.surveyBreakTime = surveyBreakTime;
  }
}
