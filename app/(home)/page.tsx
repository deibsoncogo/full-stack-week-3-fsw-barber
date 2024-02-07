import { getServerSession } from "next-auth"
import { Barbershop, Booking } from "@prisma/client"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import BookingItem from "../_components/booking-item"
import Header from "../_components/header"
import { authOptions } from "../_lib/auth"
import { db } from "../_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"
import Search from "./_components/search"

export default async function Home() {
  const session = await getServerSession(authOptions)

  const [barbershops, recommendedBarbershops, confirmedBookings] = await Promise.all([
    db.barbershop.findMany({
      orderBy: { name: "asc" },
      include: { services: true },
    }),
    db.barbershop.findMany({
      orderBy: [{ bookings: { _count: "desc" } }, { name: "asc" }],
      include: { services: true, bookings: true },
    }),
    session?.user ? db.booking.findMany({
      where: { userId: (session.user as any).id, date: { gte: new Date() } },
      include: { barbershop: true, service: true },
      orderBy: { date: "asc" },
    }) : Promise.resolve([]),
  ]) as [Barbershop[], Barbershop[], Booking[]]

  return (
    <div>
      <Header />

      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">
          {session?.user
            ? `Olá, ${session.user.name?.split(" ")[0]}!`
            : "Olá! Vamos agendar ainda hoje?"}
        </h2>

        <p className="text-sm capitalize">
          {format(new Date(), "EEEE',' dd 'de' MMMM", { locale: ptBR })}
        </p>
      </div>

      <div className="mt-6 px-5">
        <Search />
      </div>

      <div className="mt-6">
        {confirmedBookings.length > 0 && (
          <>
            <h2 className="mb-3 pl-5 text-xs font-bold uppercase text-gray-400">
              Agendamentos
            </h2>

            <div className="flex gap-3 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
              {confirmedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="mt-6">
        <h2 className="mb-3 px-5 text-xs font-bold uppercase text-gray-400">
          Empresas
        </h2>

        <div className="flex gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <div key={barbershop.id} className="min-w-[167px] max-w-[167px]">
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>

      <div className="mb-[4.5rem] mt-6">
        <h2 className="mb-3 px-5 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>

        <div className="flex gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
          {recommendedBarbershops.map((barbershop) => (
            <div key={barbershop.id} className="min-w-[167px] max-w-[167px]">
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
