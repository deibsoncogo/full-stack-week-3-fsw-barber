import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import Header from "../_components/header"
import Search from "./_components/search"

export default function Home() {
  return (
    <div>
      <Header />

      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">Olá, Miguel!</h2>

        <p className="text-sm capitalize">
          {format(new Date(), "EEEE',' dd 'de' MMMM", { locale: ptBR })}
        </p>
      </div>

      <div className="mt-6 px-5">
        <Search />
      </div>
    </div>
  )
}
