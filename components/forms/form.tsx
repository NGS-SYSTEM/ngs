'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  FormItem,
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '../ui/checkbox'

const formSchema = z.object({
  customersNames: z.string().min(2, {
    message: 'Nome do cliente deve ter no mínimo 3 caracteres.',
  }),
  vehicles: z.string().min(3, {
    message: 'Digite um nome válido de veículo',
  }),
  address: z.string().min(3, {
    message: 'Digite um endereço válido',
  }),
  monthlyValueLiability: z.coerce.number(),
  optionADueToday: z.coerce.number(),
  optionBDueToday: z.coerce.number(),
  optionCDueToday: z.coerce.number(),
  optionAMonthly: z.coerce.number(),
  optionBMonthly: z.coerce.number(),
  optionCMonthly: z.coerce.number(),
  fee: z.coerce.number().optional(), // Tornando o fee opcional
  paymentOptions: z.enum(['3', '5', '6', '11']),
  isFinanciado: z.boolean(),
  language: z.enum(['Português', 'Espanhol']),
})

export function ProposalForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customersNames: '',
      vehicles: '',
      address: '',
      monthlyValueLiability: 0,
      optionADueToday: 0,
      optionBDueToday: 0,
      optionCDueToday: 0,
      optionAMonthly: 0,
      optionBMonthly: 0,
      optionCMonthly: 0,
      fee: 250, // Definindo o valor padrão para fee como 250
      paymentOptions: '6',
      isFinanciado: true,
      language: 'Português',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    const params = new URLSearchParams({
      customersNames: values.customersNames,
      vehicles: values.vehicles,
      address: values.address,
      monthlyValueLiability: values.monthlyValueLiability.toString(),
      optionADueToday: values.optionADueToday.toString(),
      optionBDueToday: values.optionBDueToday.toString(),
      optionCDueToday: values.optionCDueToday.toString(),
      optionAMonthly: values.optionAMonthly.toString(),
      optionBMonthly: values.optionBMonthly.toString(),
      optionCMonthly: values.optionCMonthly.toString(),
      fee: values.fee?.toString() || '250', // Garantindo que fee seja passado como 250 se vazio
      paymentOptions: values.paymentOptions,
      isFinanciado: values.isFinanciado.toString(),
      language: values.language,
    })

    const imageUrl = `/api/og?${params.toString()}`
    console.log(imageUrl)

    window.open(imageUrl, '_blank')
    form.reset()
  }

  return (
    <div className="flex flex-col mt-12 items-center justify-center space-y-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 p-8 w-full max-w-lg border rounded-md shadow-lg "
        >
          <div className="flex gap-4 flex-col">
            <FormField
              control={form.control}
              name="customersNames"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-lg">
                    Nome do cliente
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do cliente..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vehicles"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-lg">Veículos</FormLabel>
                  <FormControl>
                    <Input placeholder="Veículos do cliente..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-lg">Endereço</FormLabel>
                <FormControl>
                  <Input placeholder="Endereço do cliente..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-center gap-2 align-text-top ">
            <FormField
              control={form.control}
              name="fee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-lg">Fee</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Valor da Fee..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentOptions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-lg">
                    Quantidade de pagamentos
                  </FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="border p-2 rounded-md w-full dark:bg-inherit"
                    >
                      <option value="3" className="dark:text-black">
                        3
                      </option>
                      <option value="5" className="dark:text-black">
                        5
                      </option>
                      <option value="6" className="dark:text-black">
                        6
                      </option>
                      <option value="11" className="dark:text-black">
                        11
                      </option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-6">
            <div className="text-center">
              <p className="text-green-500 font-semibold">
                Liability (Opção 1)
              </p>
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="optionADueToday"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Entrada</FormLabel>
                      <FormControl>
                        <Input placeholder="Valor a pagar hoje" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="optionAMonthly"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mensal</FormLabel>
                      <FormControl>
                        <Input placeholder="Valor mensal" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="text-center">
              <p className="text-blue-500 font-semibold">
                Full Coverage (Opção 2)
              </p>
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="optionBDueToday"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Entrada</FormLabel>
                      <FormControl>
                        <Input placeholder="Valor a pagar hoje" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="optionBMonthly"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mensal</FormLabel>
                      <FormControl>
                        <Input placeholder="Valor mensal" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="text-center">
              <p className="text-red-500 font-semibold">
                Full Coverage + Reboque (Opção 3)
              </p>
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="optionCDueToday"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Entrada</FormLabel>
                      <FormControl>
                        <Input placeholder="Valor a pagar hoje" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="optionCMonthly"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mensal</FormLabel>
                      <FormControl>
                        <Input placeholder="Valor mensal" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Campo de seleção de idioma */}
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-lg">Idioma</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="border p-2 rounded-md w-full dark:bg-inherit"
                  >
                    <option value="Português" className="dark:text-black">
                      Português
                    </option>
                    <option value="Espanhol" className="dark:text-black">
                      Espanhol
                    </option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isFinanciado"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-lg">
                  Status do veículo
                </FormLabel>
                <FormControl>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <span className="ml-2">Financiado</span>
                    </label>
                    <label className="flex items-center">
                      <Checkbox
                        checked={!field.value}
                        onCheckedChange={() => field.onChange(false)}
                      />
                      <span className="ml-2">Quitado</span>
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center">
            <Button type="submit" className="w-48">
              Gerar Proposta
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
