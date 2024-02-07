import { redirect } from "next/navigation"
import { Barbershop } from "@prisma/client"
import Header from "../_components/header"
import { db } from "../_lib/prisma"
import BarberShopItem from "../(home)/_components/barbershop-item"
import Search from "../(home)/_components/search"

interface BarbershopPageProps {
  searchParams: {
    search?: string
  }
}

const BarbershopPage = async ({ searchParams }: BarbershopPageProps) => {
  if (!searchParams.search) {
    redirect("/")
  }

  const [barbershops] = await Promise.all([
    db.barbershop.findMany({
      where: {
        name: {
          contains: searchParams.search,
          mode: "insensitive",
        },
      },
    }),
  ]) as [Barbershop[]]

  return (
    <>
      <Header />

      <div className="flex flex-col gap-6 px-5 py-6">
        <Search defaultValues={{ search: searchParams.search }} />

        <h1 className="text-xs font-bold uppercase text-gray-400">
          Resultados para &quot;{searchParams.search}&quot;
        </h1>

        <div className="grid grid-cols-2 gap-4">
          {barbershops.map((barbershop) => (
            <div key={`${barbershop.id}Div`} className="w-full">
              <BarberShopItem key={barbershop.id} barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default BarbershopPage
