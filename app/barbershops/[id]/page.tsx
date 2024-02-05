import { Service } from "@prisma/client"
import BarbershopInfo from "./_components/barbershop-info"
import ServiceItem from "./_components/service-item"
import { db } from "@/app/_lib/prisma"

interface BarbershopDetailsPageProps {
  params: {
    id?: string
  }
}

const BarbershopDetailsPage = async ({ params }: BarbershopDetailsPageProps) => {
  if (!params.id) {
    return null
  }

  const barbershop = await db.barbershop.findUnique({
    where: { id: params.id },
    include: { services: true },
  })

  if (!barbershop) {
    return null
  }

  return (
    <div>
      <BarbershopInfo barbershop={barbershop} />

      <div className="flex flex-col gap-4 px-5 py-6">
        {barbershop.services.map((service: Service) => (
          <ServiceItem key={service.id} service={service} />
        ))}
      </div>
    </div>
  )
}

export default BarbershopDetailsPage
