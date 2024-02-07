import { addMinutes, format, setHours, setMinutes } from "date-fns"
import { ptBR } from "date-fns/locale"

export function generateDayTimeList(date: Date): string[] {
  const startTime = setMinutes(setHours(date, 9), 0)
  const endTime = setMinutes(setHours(date, 21), 0)

  const interval = 45
  const timeList: string[] = []

  let currentTime = startTime

  while (currentTime <= endTime) {
    timeList.push(format(currentTime, "HH:mm", { locale: ptBR }))
    currentTime = addMinutes(currentTime, interval)
  }

  return timeList
}
