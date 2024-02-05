import { Barbershop } from "@prisma/client"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import BookingItem from "../_components/booking-item"
import Header from "../_components/header"
import { db } from "../_lib/prisma"
import BarberShopItem from "./_components/barbershop-item"
import Search from "./_components/search"

export default async function Home() {
  const barbershops = await db.barbershop.findMany()

  return (
    <div>
      <Header />

      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">Olá, Miguel!</h2>

        <p className="text-sm capitalize">
          {format(new Date(), "EEEE',' dd 'de' MMMM", { locale: ptBR })}
        </p>
      </div>

      <div className="mt-6 px-5">
        <Search />
      </div>

      <div className="mt-6 px-5">
        <h2 className="mb-3 text-xs font-bold uppercase text-gray-400">
          Agendamentos
        </h2>

        <BookingItem />
      </div>

      <div className="mt-6">
        <h2 className=" mb-3 px-5 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>

        <div className="flex gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop: Barbershop) => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>

      <div className="mb-[4.5rem] mt-6">
        <h2 className=" mb-3 px-5 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>

        <div className="flex gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop: Barbershop) => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}
