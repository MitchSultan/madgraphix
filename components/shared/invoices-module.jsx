import { DataTable } from "@/components/dashboard/data-table"
import data from "@/app/(admin)/admin/dashboard/data.json"

export function InvoicesModule({ role }) {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Invoices</h1>
      </div>
      <div className="rounded-md border p-4 bg-background">
        {/* We use the shared DataTable and pass the role down so it can filter columns internally */}
        <DataTable data={data} role={role} />
      </div>
    </div>
  )
}
