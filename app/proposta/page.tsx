import { ProposalForm } from '@/components/forms/form'
import { Header } from '@/components/headers/header'

export default async function Proposta() {
  return (
    <div className="flex flex-col">
      <Header />
      <ProposalForm />
    </div>
  )
}
