import { parse,  formatISO, parseISO, format } from 'date-fns'

export function convertToISO(strDate: string) {
  const newDate = parse(strDate, 'dd/MM/yyyy', new Date())
  return formatISO(newDate)
}