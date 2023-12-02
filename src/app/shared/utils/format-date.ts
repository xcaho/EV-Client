export function FormatDate(inputValue: string) {
  const date = new Date(inputValue);
  let month = date.getMonth() + 1

  return date.getDate() + '.' + month + '.' + date.getFullYear();
}
