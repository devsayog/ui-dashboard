import { listToObj } from '@/utils/arrayUtils'

import type { ListsByIdType, ListType } from '../types'

export const initBoard = (lists: ListType[]) => {
  const obj = listToObj<ListType>(lists)
  const ids = lists.map((list) => list.id)

  return { obj, ids }
}
export const findCardById = (id: string, listById: ListsByIdType) => {
  return Object.keys(listById)
    .map((listId) => listById[listId]!.cards)
    .flat()
    .find((card) => card.id === id)
}
