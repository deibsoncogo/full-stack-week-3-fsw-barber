"use client"

import { signIn } from "next-auth/react"
import Image from "next/image"
import { useMemo, useState } from "react"
import { Barbershop, Service } from "@prisma/client"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { generateDayTimeList } from "../_helpers/hours"
import { Button } from "@/app/_components/ui/button"
import { Calendar } from "@/app/_components/ui/calendar"
import { Card, CardContent } from "@/app/_components/ui/card"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/app/_components/ui/sheet"

interface ServiceItemProps {
  barbershop: Barbershop
  service: Service
  isAuthenticated: boolean
}

const ServiceItem = ({ barbershop, service, isAuthenticated }: ServiceItemProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [hour, setHour] = useState<string | undefined>()

  const timeList = useMemo(() => {
    return date ? generateDayTimeList(date) : []
  }, [date])

  const handleBookingClick = () => {
    if (!isAuthenticated) {
      return signIn("google")
    }

    return null
  }

  const handleDateClick = (dateClick: Date | undefined) => {
    setDate(dateClick)
    setHour(undefined)
  }

  const handleHourClick = (time: string) => {
    setHour(time)
  }

  return (
    <Card>
      <CardContent className="w-full p-3">
        <div className="flex w-full items-center gap-4">
          <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
            <Image
              src={service.imageUrl}
              alt={service.name}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-lg"
            />
          </div>

          <div className="flex w-full flex-col">
            <h2 className="font-bold">{service.name}</h2>
            <p className="text-sm text-gray-400">{service.description}</p>

            <div className="mt-3 flex items-center justify-between">
              <p className="text-sm font-bold text-primary">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency", currency: "BRL",
                }).format(Number(service.price))}
              </p>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="secondary" onClick={handleBookingClick}>
                    Reservar
                  </Button>
                </SheetTrigger>

                <SheetContent className="p-0">
                  <SheetHeader className="border-b border-solid border-secondary px-5 py-6 text-left">
                    <SheetTitle>Fazer Reserva</SheetTitle>
                  </SheetHeader>

                  <div className="py-6">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateClick}
                      locale={ptBR}
                      fromDate={new Date()}
                      styles={{
                        head_cell: { width: "100%", textTransform: "capitalize" },
                        cell: { width: "100%" },
                        button: { width: "100%" },
                        nav_button_previous: { width: "32px", height: "32px" },
                        nav_button_next: { width: "32px", height: "32px" },
                        caption: { textTransform: "capitalize" },
                      }}
                    />
                  </div>

                  {date && (
                    <div className="flex gap-3 overflow-x-auto border-t border-solid border-secondary px-5 py-6 [&::-webkit-scrollbar]:hidden">
                      {timeList.map((time) => (
                        <Button
                          key={time}
                          variant={hour === time ? "default" : "outline"}
                          onClick={() => handleHourClick(time)}
                          className="rounded-full"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}

                  <div className="border-t border-solid border-secondary px-5 py-6">
                    <Card>
                      <CardContent className="flex flex-col gap-3 p-3">
                        <div className="flex justify-between">
                          <h2 className="font-bold">{service.name}</h2>

                          <h3 className="text-sm font-bold">
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency", currency: "BRL",
                            }).format(Number(service.price))}
                          </h3>
                        </div>

                        {date && (
                          <div className="flex justify-between">
                            <h3 className="text-sm text-gray-400">Data</h3>

                            <h4 className="text-sm">
                              {format(date, "dd 'de' MMMM", { locale: ptBR })}
                            </h4>
                          </div>
                        )}

                        {hour && (
                          <div className="flex justify-between">
                            <h3 className="text-sm text-gray-400">Horário</h3>
                            <h4 className="text-sm">{hour}</h4>
                          </div>
                        )}

                        <div className="flex justify-between">
                          <h3 className="text-sm text-gray-400">Barbearia</h3>
                          <h4 className="text-sm">{barbershop.name}</h4>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <SheetFooter className="px-5">
                    <Button disabled={!date || !hour}>Confirmar reserva</Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem
