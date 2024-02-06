"use server"

import { endOfDay, startOfDay } from "date-fns"
import { db } from "@/app/_lib/prisma"

export const getDayBookings = async (barbershopId: string, date: Date) => {
  const bookings = await db.booking.findMany({
    where: {
      barbershopId,
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  })

  return bookings
}
