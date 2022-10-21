/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import create from 'zustand'
import { immer } from 'zustand/middleware/immer'

import type {
  ListsByIdType,
  ListType,
  MoveCardParams,
  MoveCardToListParams,
} from '@/components/kanban/types'
import { initBoard, moveCard } from '@/components/kanban/utils/dndUtils'
import { getById, insert, removeById } from '@/utils/arrayUtils'

export interface AppState {
  lists: string[]
  listsById: ListsByIdType
  initBoard: (params: ListType[]) => void
  setListsById: (params: ListsByIdType) => void
  moveCard: (params: MoveCardParams) => void
  moveCardToList: (params: MoveCardToListParams) => void
}

export const useAppStore = create(
  immer<AppState>((set, get) => ({
    lists: [],
    listsById: {},
    initBoard(lists) {
      const { ids, obj } = initBoard(lists)
      set((state) => {
        state.lists = ids
        state.listsById = obj
      })
    },
    setListsById(list) {
      set((state) => {
        state.listsById = list
      })
    },
    moveCard(params) {
      set((state) => {
        state.listsById[params.list.id]!.cards = moveCard(params)
      })
    },
    moveCardToList({ cardId, fromList, toList, pos }) {
      const fromCard = getById(fromList.cards, cardId)
      const toCards = get().listsById[toList.id]!.cards
      set((state) => {
        if (!fromCard) return state
        state.listsById[fromList.id]!.cards = removeById(
          get().listsById[fromList.id]!.cards,
          cardId,
        )
        state.listsById[toList.id]!.cards = insert(toCards, fromCard, pos)
      })
    },
  })),
)
