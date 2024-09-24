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
  fee: z.coerce.number(),
  isFinanciado: z.boolean(),
  language: z.enum(['Português', 'Espanhol']), // Adicionando o campo de idioma com opções
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
      fee: 0,
      isFinanciado: true,
      language: 'Português', // Definindo o valor padrão para o idioma
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
      fee: values.fee.toString(),

      isFinanciado: values.isFinanciado.toString(),
      language: values.language, // Incluindo o idioma selecionado nos parâmetros
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
          className="space-y-8 p-8 w-full max-w-lg border rounded-md shadow-lg bg-white"
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

          <div className="flex flex-col gap-6">
            <div className="text-center">
              <p className="text-green-500 font-semibold">
                Liability (Opção A)
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
                Full Coverage (Opção B)
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
                Full Coverage + Reboque (Opção C)
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
                <FormLabel className="font-bold text-lg">
                  Idioma da Proposta
                </FormLabel>
                <FormControl>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center">
                      <Checkbox
                        checked={field.value === 'Português'}
                        onCheckedChange={() => field.onChange('Português')}
                      />
                      <span className="ml-2">Português</span>
                    </label>
                    <label className="flex items-center">
                      <Checkbox
                        checked={field.value === 'Espanhol'}
                        onCheckedChange={() => field.onChange('Espanhol')}
                      />
                      <span className="ml-2">Espanhol</span>
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo de status de veículo */}
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

          <Button type="submit" className="w-full">
            Enviar Proposta
          </Button>
        </form>
      </Form>
    </div>
  )
}
