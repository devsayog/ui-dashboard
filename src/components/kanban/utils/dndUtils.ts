import type { Active, Over } from '@dnd-kit/core'

import { listToObj } from '@/utils/arrayUtils'

import type { ListsByIdType, ListType, MoveCardParams } from '../types'

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
export const findContainerForCard = (id: string, list: ListsByIdType) => {
  return Object.keys(list).find((listId) =>
    list[listId]!.cards.find((card) => card.id === id),
  )
}
export const findContainer = (id: string, list: ListsByIdType) => {
  if (id in list) {
    return id
  }
  return findContainerForCard(id, list)
}

export const isBelowOverItem = (over: Over, active: Active) => {
  return !!(
    over &&
    active.rect.current.translated &&
    active.rect.current.translated?.top > over.rect.top + over.rect.height
  )
}
export const getNewIndex = (
  overListCardIndex: number,
  over: Over,
  active: Active,
): number => {
  const modifier = isBelowOverItem(over, active) ? 1 : 0
  return overListCardIndex + modifier
}
export const moveCard = ({ cardId, list, pos }: MoveCardParams) => {
  const oldIndex = list.cards.findIndex((card) => card.id === cardId)
  const clone = structuredClone(list.cards)
  clone.splice(pos, 0, clone.splice(oldIndex, 1)[0]!)
  return clone
}
