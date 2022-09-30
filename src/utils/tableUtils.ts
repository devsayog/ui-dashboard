import type { RowSelectionState } from '@tanstack/react-table'
import type { Dispatch, SetStateAction } from 'react'

type DeleteSelectedRowsTypes<T> = {
  rowSelection: RowSelectionState
  data: T[]
  setData: Dispatch<SetStateAction<T[]>>
  setRowSelection: Dispatch<SetStateAction<RowSelectionState>>
}
export const deleteSelectedRows = <T>({
  rowSelection,
  data,
  setData,
  setRowSelection,
}: DeleteSelectedRowsTypes<T>) => {
  const keys = Object.keys(rowSelection)
  const dataCopy = [...data]

  // eslint-disable-next-line no-plusplus
  for (let i = keys.length - 1; i >= 0; i--) {
    dataCopy.splice(Number(keys[i]), 1)
  }
  setData(dataCopy)
  setRowSelection({})
}
