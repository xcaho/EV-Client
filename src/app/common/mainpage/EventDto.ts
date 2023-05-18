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

  public constructor(name: string, description: string, researchStartDate: string, researchEndDate: string, endDate: string,
                     maxUsers: number, surveyDuration: number, surveyBreakTime: number, slotsTaken: number) {
    this.name = name;
    this.description = description;
    this.researchStartDate = researchStartDate;
    this.researchEndDate = researchEndDate;
    this.endDate = endDate;
    this.maxUsers = maxUsers;
    this.surveyDuration = surveyDuration;
    this.surveyBreakTime = surveyBreakTime;
    this.slotsTaken = slotsTaken
  }

  getSurveyDurationHHMM() {
    return this.convertMinutesToHHMM(this.surveyDuration)
  }

  convertMinutesToHHMM(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const hoursString = hours.toString().padStart(2, '0');
    const minutesString = remainingMinutes.toString().padStart(2, '0');

    return `${hoursString}:${minutesString}`;
  }
}
