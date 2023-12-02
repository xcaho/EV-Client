export class ConsentDto {

  public id: number = 0;
  public content: string;
  public mandatory: boolean;
  public eventId: number

  constructor(content: string, mandatory: boolean, eventId: number = 0, id: number = 0) {
    this.content = content;
    this.mandatory = mandatory;
    this.eventId = eventId;
    this.id = id;
  }
}
