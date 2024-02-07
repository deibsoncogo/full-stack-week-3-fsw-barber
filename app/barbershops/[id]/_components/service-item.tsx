"use client"

import { signIn, useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { Barbershop, Booking, Service } from "@prisma/client"
import { addDays, format, setHours, setMinutes } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { getDayBookings } from "../_actions/get-bookings"
import { saveBooking } from "../_actions/save-booking"
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
  const { data } = useSession()

  const router = useRouter()
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [hour, setHour] = useState<string | undefined>()
  const [submitIsLoading, setSubmitIsLoading] = useState(false)
  const [sheetIsOpen, setSheetIsOpen] = useState(false)
  const [dayBookings, setDayBookings] = useState<Booking[]>([])

  const timeList = useMemo(() => {
    if (!date) { return [] }

    return generateDayTimeList(date).filter((time) => {
      const timeHour = Number(time.split(":")[0])
      const timeMinutes = Number(time.split(":")[1])

      const booking = dayBookings.find((bookingFind) => {
        const bookingHour = bookingFind.date.getHours()
        const bookingMinutes = bookingFind.date.getMinutes()

        return bookingHour === timeHour && bookingMinutes === timeMinutes
      })

      if (!booking) { return true }

      return false
    })
  }, [date, dayBookings])

  const handleBookingSubmit = async () => {
    setSubmitIsLoading(true)

    try {
      if (!date || !hour || !data?.user) { return }

      const dateHour = Number(hour.split(":")[0])
      const dateMinutes = Number(hour.split(":")[1])

      const newDate = setMinutes(setHours(date, dateHour), dateMinutes).toISOString()

      await saveBooking({
        serviceId: service.id,
        barbershopId: barbershop.id,
        date: newDate,
        userId: (data.user as any).id,
      })

      setSheetIsOpen(false)

      setDate(undefined)
      setHour(undefined)

      toast("Reserva realizada com sucesso!", {
        description: format(newDate, "'Para' dd 'de' MMMM 'às' HH':'mm", {
          locale: ptBR,
        }),
        action: {
          label: "Visualizar",
          onClick: () => router.push("/bookings"),
        },
      })
    } catch (error) {
      console.error("Error =>", error)
    } finally {
      setSubmitIsLoading(false)
    }
  }

  const handleBookingClick = () => {
    if (!isAuthenticated) { signIn("google") }
  }

  const handleDateClick = (dateClick: Date | undefined) => {
    setDate(dateClick)
    setHour(undefined)
  }

  const handleHourClick = (time: string) => {
    setHour(time)
  }

  useEffect(() => {
    if (!date) { return }

    const refreshAvailableHours = async () => {
      const _dayBookings = await getDayBookings(barbershop.id, date)
      setDayBookings(_dayBookings)
    }

    refreshAvailableHours()
  }, [date, barbershop.id])

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
                {Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })
                  .format(Number(service.price))}
              </p>

              <Sheet open={sheetIsOpen && isAuthenticated} onOpenChange={setSheetIsOpen}>
                <SheetTrigger asChild>
                  <Button onClick={handleBookingClick} variant="secondary">
                    Reservar
                  </Button>
                </SheetTrigger>

                <SheetContent className="overflow-y-auto p-0 [&::-webkit-scrollbar]:hidden">
                  <SheetHeader className="border-b border-solid border-secondary px-5 py-6 text-left">
                    <SheetTitle>Fazer Reserva</SheetTitle>
                  </SheetHeader>

                  <div className="py-6">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateClick}
                      locale={ptBR}
                      fromDate={addDays(new Date(), 1)}
                      styles={{
                        head_cell: { width: "100%", textTransform: "capitalize" },
                        cell: { width: "100%" },
                        button: { width: "100%" },
                        nav_button_previous: { width: "32px", height: "32px" },
                        nav_button_next: { width: "32px", height: "32px" },
                        caption: { textTransform: "capitalize" },
                        month: { width: "100%" },
                      }}
                    />
                  </div>

                  {date && (
                    <div className="flex gap-3 overflow-x-auto border-t border-solid border-secondary px-5 py-6 [&::-webkit-scrollbar]:hidden">
                      {timeList.map((time) => (
                        <Button
                          key={time}
                          onClick={() => handleHourClick(time)}
                          variant={hour === time ? "default" : "outline"}
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
                            {Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })
                              .format(Number(service.price))}
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

                  <SheetFooter className="p-5 pt-0">
                    <Button
                      disabled={!date || !hour || submitIsLoading}
                      onClick={handleBookingSubmit}
                      className="flex w-full"
                    >
                      {submitIsLoading && (
                        <Loader2 className="mr-2 size-4 animate-spin" />
                      )}

                      Confirmar reserva
                    </Button>
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
