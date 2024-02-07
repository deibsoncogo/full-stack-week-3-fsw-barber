"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Barbershop } from "@prisma/client"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, ScissorsIcon } from "lucide-react"
import SideMenu from "@/app/_components/side-menu"
import { Button } from "@/app/_components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet"

interface BarbershopInfoProps {
  barbershop: Barbershop
}

const BarbershopInfo = ({ barbershop }: BarbershopInfoProps) => {
  const router = useRouter()

  const amountServices = barbershop.services.length

  const handleBackClick = () => {
    router.replace("/")
  }

  return (
    <div>
      <div className="relative h-[250px] w-full">
        <Button onClick={handleBackClick} size="icon" variant="outline" className="absolute left-4 top-4 z-50">
          <ChevronLeftIcon size={18} />
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="absolute right-4 top-4 z-50">
              <MenuIcon size={18} />
            </Button>
          </SheetTrigger>

          <SheetContent className="p-0">
            <SideMenu />
          </SheetContent>
        </Sheet>

        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          style={{ objectFit: "cover" }}
          className="opacity-75"
        />
      </div>

      <div className="border-b border-solid border-secondary px-5 pb-6 pt-3">
        <h1 className="text-xl font-bold">{barbershop.name}</h1>

        <div className="mt-2 flex items-center gap-1">
          <MapPinIcon size={18} className="text-primary" />
          <p className="text-sm">{barbershop.address}</p>
        </div>

        <div className="mt-2 flex items-center gap-1">
          <ScissorsIcon size={18} className="text-primary" />

          <p className="text-sm">
            {amountServices} serviço{amountServices > 1 ? "s" : ""} cadastrado
          </p>
        </div>
      </div>

    </div>
  )
}

export default BarbershopInfo
