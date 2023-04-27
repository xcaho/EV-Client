export class EventDto {

  public name: string
  public description: string
  public researchStartDate: string
  public researchEndDate: string
  public endDate: string
  public maxUsers: number
  public surveyDuration: number
  public surveyBreakTime: number
  public slotsTaken: number

  public constructor(name: string, description: string, researchStartDate: string, researchEndDate: string, endDate: string,
                     maxUsers: number, surveyDuration: number, surveyBreakTime: number) {
    this.name = name;
    this.description = description;
    this.researchStartDate = researchStartDate;
    this.researchEndDate = researchEndDate;
    this.endDate = endDate;
    this.maxUsers = maxUsers;
    this.surveyDuration = surveyDuration;
    this.surveyBreakTime = surveyBreakTime;
    this.slotsTaken = 0
  }
}
