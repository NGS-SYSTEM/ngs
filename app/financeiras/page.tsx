import { Header } from '@/components/headers/header'
import { DataTable } from './data-table'
import { columns } from './columns'
import { lienholderList } from './financeiras'

export default async function Financeiras() {
  return (
    <div className="flex flex-col mx-auto w-1/2 justify-center items=start">
      <Header />
      <div className="">
        <DataTable data={lienholderList} columns={columns} />
      </div>
    </div>
  )
}
