import { listToObj } from '@/utils/arrayUtils'

import type { ListType } from '../types'

export const initBoard = (lists: ListType[]) => {
  const obj = listToObj<ListType>(lists)
  const ids = lists.map((list) => list.id)

  return { obj, ids }
}
