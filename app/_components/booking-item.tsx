"use client"

import Image from "next/image"
import { useState } from "react"
import { Prisma } from "@prisma/client"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { cancelBooking } from "../_actions/cancel-booking"
import BookingInfo from "./booking-info"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{ include: { barbershop: true, service: true } }>
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)

  const isBookingConfirmed = isFuture(booking.date)

  const handleCancelClick = async () => {
    setIsDeleteLoading(true)

    try {
      await cancelBooking(booking.id)
      toast.success("Reserva cancelada com sucesso!")
    } catch (error) {
      console.error("Error =>", error)
    } finally {
      setIsDeleteLoading(false)
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card className="min-w-full cursor-pointer">
          <CardContent className="flex p-0">
            <div className="flex flex-[3] flex-col gap-2 py-5 pl-5">
              <Badge variant={isBookingConfirmed ? "default" : "secondary"} className="w-fit">
                {isBookingConfirmed ? "Confirmado" : "Finalizado"}
              </Badge>

              <h2 className="font-bold">{booking.service.name}</h2>

              <div className="flex items-center gap-2">
                <Avatar className="size-6">
                  <AvatarImage src={booking.barbershop.imageUrl} />
                  <AvatarFallback>{booking.barbershop.name[0]}</AvatarFallback>
                </Avatar>

                <h3 className="text-sm">{booking.barbershop.name}</h3>
              </div>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center border-l border-solid border-secondary">
              <p className="text-sm capitalize">
                {format(booking.date, "MMMM", { locale: ptBR })}
              </p>

              <p className="text-2xl">
                {format(booking.date, "dd", { locale: ptBR })}
              </p>

              <p className="text-sm">
                {format(booking.date, "HH:mm", { locale: ptBR })}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>

      <SheetContent className="overflow-y-auto px-0 [&::-webkit-scrollbar]:hidden">
        <SheetHeader className="border-b border-solid border-secondary px-5 pb-6 text-left">
          <SheetTitle>Informações da Reserva</SheetTitle>
        </SheetHeader>

        <div className="px-5">
          <div className="relative mt-6 h-[180px] w-full">
            <Image src="/map.png" fill alt={booking.barbershop.name} />

            <div className="absolute bottom-4 left-0 w-full px-5">
              <Card>
                <CardContent className="flex items-center gap-2 p-3">
                  <Avatar>
                    <AvatarImage src={booking.barbershop.imageUrl} />
                    <AvatarFallback>{booking.barbershop.name[0]}</AvatarFallback>
                  </Avatar>

                  <div>
                    <h2 className="font-bold">{booking.barbershop.name}</h2>
                    <h3 className="text-xs">{booking.barbershop.address}</h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Badge variant={isBookingConfirmed ? "default" : "secondary"} className="my-3 w-fit">
            {isBookingConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>

          <BookingInfo booking={booking} />

          <SheetFooter className="mt-6 flex-row gap-3">
            <SheetClose asChild>
              <Button variant="secondary" className="w-full">
                Voltar
              </Button>
            </SheetClose>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  disabled={!isBookingConfirmed || isDeleteLoading}
                  variant="destructive"
                  className="w-full"
                >
                  Cancelar Reserva
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent className="w-[90%]">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Deseja mesmo cancelar essa reserva?
                  </AlertDialogTitle>

                  <AlertDialogDescription>
                    Uma vez cancelada, não será possível reverter essa ação
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="flex-row gap-3">
                  <AlertDialogCancel className="mt-0 w-full">
                    Voltar
                  </AlertDialogCancel>

                  <AlertDialogAction
                    disabled={isDeleteLoading}
                    onClick={handleCancelClick}
                    className="w-full"
                  >
                    {isDeleteLoading && (
                      <Loader2 className="mr-2 size-4 animate-spin" />
                    )}

                    Confirmar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default BookingItem
