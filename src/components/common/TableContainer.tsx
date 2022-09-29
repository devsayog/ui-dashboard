import type { ReactNode } from 'react'

const TableContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mt-4 flex flex-col">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full py-2 align-middle">
          <div className="overflow-hidden shadow ring-1 ring-white/5 md:rounded-lg">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
export default TableContainer
