import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { Booking } from "@prisma/client"
import BookingItem from "../_components/booking-item"
import Header from "../_components/header"
import { authOptions } from "../_lib/auth"
import { db } from "../_lib/prisma"

const BookingsPage = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user) { return redirect("/") }

  const [confirmedBookings, finishedBookings] = await Promise.all([
    db.booking.findMany({
      where: { userId: (session.user as any).id, date: { gte: new Date() } },
      include: { barbershop: true, service: true },
      orderBy: { date: "asc" },
    }),
    db.booking.findMany({
      where: { userId: (session.user as any).id, date: { lt: new Date() } },
      include: { barbershop: true, service: true },
      orderBy: { date: "desc" },
    }),
  ]) as [Booking[], Booking[]]

  return (
    <>
      <Header />

      <div className="px-5 py-6">
        <h1 className="mb-6 text-xl font-bold">Agendamentos</h1>

        {confirmedBookings.length > 0 && (
          <>
            <h2 className="mb-3 text-sm font-bold uppercase text-gray-400">
              Confirmados
            </h2>

            <div className="flex flex-col gap-3">
              {confirmedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        )}

        {finishedBookings.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 text-sm font-bold uppercase text-gray-400">
              Finalizados
            </h2>

            <div className="flex flex-col gap-3">
              {finishedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default BookingsPage
