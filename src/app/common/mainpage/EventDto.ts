export class EventDto {

  public id: number = 0
  public name: string
  public description: string
  public researchStartDate: string
  public researchEndDate: string
  public endDate: string
  public maxUsers: number
  public surveyDuration: number
  public surveyBreakTime: number
  public slotsTaken: number = 0
  public active: boolean = true

  public constructor(name: string, description: string, researchStartDate: string, researchEndDate: string,
                     endDate: string, maxUsers: number, surveyDuration: number, surveyBreakTime: number,
                     slotsTaken: number, id: number = 0, active: boolean = true) {
    this.name = name;
    this.description = description;
    this.researchStartDate = researchStartDate;
    this.researchEndDate = researchEndDate;
    this.endDate = endDate;
    this.maxUsers = maxUsers;
    this.surveyDuration = surveyDuration;
    this.surveyBreakTime = surveyBreakTime;
    this.slotsTaken = slotsTaken;
    this.id = id;
    this.active = active;
  }

  public isActive() {
    return this.active ? "Aktywny" : "Nieaktywny"
  }
}
