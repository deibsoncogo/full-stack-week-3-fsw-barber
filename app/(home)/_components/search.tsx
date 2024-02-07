"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SearchIcon } from "lucide-react"
import { z } from "zod"
import { Button } from "@/app/_components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/app/_components/ui/form"
import { Input } from "@/app/_components/ui/input"

interface SearchProps {
  defaultValues?: z.infer<typeof formSchema>
}

const formSchema = z.object({
  search: z.string({ required_error: "Campo obrigatório" })
    .trim().min(1, "Campo obrigatório"),
})

const Search = ({ defaultValues }: SearchProps) => {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    router.push(`/barbershops?search=${data.search}`)
  }

  return (
    <div className="flex items-center gap-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex w-full gap-4">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Busque por uma barbearia..." {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" variant="default">
            <SearchIcon size={18} />
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default Search
