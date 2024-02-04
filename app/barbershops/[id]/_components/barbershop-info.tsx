"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Barbershop } from "@prisma/client"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import { Button } from "@/app/_components/ui/button"

interface BarbershopInfoProps {
  barbershop: Barbershop
}

const BarbershopInfo = ({ barbershop }: BarbershopInfoProps) => {
  const router = useRouter()

  const handleBackClick = () => {
    router.back()
  }

  return (
    <div>
      <div className="relative h-[250px] w-full">
        <Button onClick={handleBackClick} size="icon" variant="outline" className="absolute left-4 top-4 z-50">
          <ChevronLeftIcon />
        </Button>

        <Button size="icon" variant="outline" className="absolute right-4 top-4 z-50">
          <MenuIcon />
        </Button>

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
          <StarIcon size={18} className="text-primary" />
          <p className="text-sm">5.0 (899 avaliações)</p>
        </div>
      </div>

    </div>
  )
}

export default BarbershopInfo
