export function FormatDate(inputValue: string) {
  const date = new Date(inputValue);
  date.setMonth(date.getMonth() + 1)

  return date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
}
