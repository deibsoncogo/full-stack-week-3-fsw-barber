"use client"

import Image from "next/image"
import Link from "next/link"
import { MenuIcon } from "lucide-react"
import SideMenu from "./side-menu"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"

const Header = () => {
  return (
    <header>
      <Card>
        <CardContent className="flex flex-row items-center justify-between p-5">
          <Link href="/">
            <Image src="/logo.png" alt="FSW Barber" height={18} width={120} />
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <MenuIcon size={18} />
              </Button>
            </SheetTrigger>

            <SheetContent className="p-0">
              <SideMenu />
            </SheetContent>
          </Sheet>
        </CardContent>
      </Card>
    </header>
  )
}

export default Header
