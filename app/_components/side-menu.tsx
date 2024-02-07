"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, UserIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { SheetHeader, SheetTitle } from "./ui/sheet"

const SideMenu = () => {
  const { data } = useSession()

  const handleLoginClick = () => {
    signIn("google")
  }

  const handleLogoutClick = () => {
    signOut()
  }

  return (
    <>
      <SheetHeader className="border-b border-solid border-secondary p-5 text-left">
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>

      {data?.user ? (
        <div className="flex items-center justify-between px-5 py-6">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={data.user?.image ?? ""} />
              <AvatarFallback>{data.user?.name ? data.user?.name[0] : ""}</AvatarFallback>
            </Avatar>

            <h2 className="font-bold">{data.user?.name}</h2>
          </div>

          <Button variant="secondary" size="icon">
            <LogOutIcon size={18} onClick={handleLogoutClick} />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-3 px-5 py-6">
          <div className="flex items-center gap-2">
            <UserIcon size={32} />
            <h2 className="font-bold">Olá, faça seu login!</h2>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 px-5">
        {!data?.user && (
          <Button
            onClick={handleLoginClick}
            variant="secondary"
            className="w-full justify-start"
          >
            <LogInIcon size={18} className="mr-2" />
            Fazer Login
          </Button>
        )}

        <Button asChild variant="outline" className="justify-start">
          <Link href="/">
            <HomeIcon size={18} className="mr-2" />
            Início
          </Link>
        </Button>

        {data?.user && (
          <Button asChild variant="outline" className="justify-start">
            <Link href="/bookings">
              <CalendarIcon size={18} className="mr-2" />
              Agendamentos
            </Link>
          </Button>
        )}
      </div>
    </>
  )
}

export default SideMenu
