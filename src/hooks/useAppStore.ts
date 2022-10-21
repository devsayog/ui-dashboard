/* eslint-disable no-param-reassign */
import create from 'zustand'
import { immer } from 'zustand/middleware/immer'

import type { ListsByIdType, ListType } from '@/components/kanban/types'
import { initBoard } from '@/components/kanban/utils/dndUtils'

export interface AppState {
  lists: string[]
  listsById: ListsByIdType
  initBoard: (params: ListType[]) => void
  setListsById: (params: ListsByIdType) => void
}

export const useAppStore = create(
  immer<AppState>((set) => ({
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
  })),
)
