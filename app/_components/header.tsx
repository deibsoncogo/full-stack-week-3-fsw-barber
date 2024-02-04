import Image from "next/image"
import { MenuIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"

const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Image src="/logo.png" alt="FSW Barber" height={18} width={120} />

        <Button variant="outline" size="icon">
          <MenuIcon size={16} />
        </Button>
      </CardContent>
    </Card>
  )
}

export default Header
