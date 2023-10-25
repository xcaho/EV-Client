export class ConfirmationDto {

  eventName: string
  date: Date
  dateFormatted: string

  constructor(eventName: string, date: Date) {
    this.eventName = eventName;
    this.date = date;
    this.dateFormatted = date.toLocaleTimeString('pl-PL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
}
