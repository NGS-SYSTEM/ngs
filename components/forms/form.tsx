'use client'

// import { zodResolver } from '@hookform/resolvers/zod'
// import { useForm } from 'react-hook-form'
// import { z } from 'zod'
// import {
//   FormItem,
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormLabel,
//   FormMessage,
// } from '../ui/form'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// const formSchema = z.object({
//   username: z.string().min(2, {
//     message: 'Nome do cliente deve ter no minímo 3 caracteres.',
//   }),
//   vehicles: z.string().min(3, {
//     message: 'Digite um nome válido de veículo',
//   }),
//   valueLiability: z.number({ message: 'Valor inválido' }),
// })

export function ProposalForm() {
  // 1. Define your form.
  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     username: '',
  //     vehicles: '',
  //     valueLiability: 0,
  //   },
  // })

  // // 2. Define a submit handler.
  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   // Do something with the form values.
  //   // ✅ This will be type-safe and validated.
  //   console.log(values)
  // }
  return <h1 className="mx-auto mt-20 font-bold text-3xl">Em breve...</h1>
}
