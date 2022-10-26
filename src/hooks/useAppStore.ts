/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { v4 } from 'uuid'
import create from 'zustand'
import { immer } from 'zustand/middleware/immer'

import type {
  AddEventType,
  DeleteEventType,
  EventByIdType,
  EventType,
} from '@/components/calendar/types'
import type {
  AddCardParams,
  CardType,
  ListsByIdType,
  ListType,
  MoveCardParams,
  MoveCardToListParams,
  MoveListParams,
  RemoveCardFromBoardParams,
} from '@/components/kanban/types'
import { initBoard, moveCard } from '@/components/kanban/utils/dndUtils'
import { getById, insert, removeById } from '@/utils/arrayUtils'

export interface AppState {
  lists: string[]
  listsById: ListsByIdType
  eventById: EventByIdType
  addEvent: (params: AddEventType) => void
  updateEvent: (params: EventType) => void
  deleteEvent: (params: DeleteEventType) => void
  initBoard: (params: ListType[]) => void
  setListsById: (params: ListsByIdType) => void
  addCard: (params: AddCardParams) => void
  moveCard: (params: MoveCardParams) => void
  moveCardToList: (params: MoveCardToListParams) => void
  updateCard: (params: CardType) => void
  removeCardFromBoard: (params: RemoveCardFromBoardParams) => void
  addList: (params: string) => void
  setList: (params: ListType) => void
  moveList: (params: MoveListParams) => void
  removeListFromBoard: (params: string) => void
}

export const useAppStore = create(
  immer<AppState>((set, get) => ({
    lists: [],
    listsById: {},
    eventById: {},
    addEvent({ date, description, title }) {
      const event: EventType = {
        date,
        description,
        title,
        id: v4(),
      }
      set((state) => {
        const exists = get().eventById[event.date]
        if (!exists) {
          state.eventById[event.date] = { events: [event] }
          return state
        }
        state.eventById[event.date]!.events.push(event)
      })
    },
    updateEvent(params) {
      const eventIndex = get().eventById[params.date]!.events.findIndex(
        (e) => e.id === params.id,
      )
      set((state) => {
        state.eventById[params.date]!.events[eventIndex] = params
      })
    },
    deleteEvent({ date, id }) {
      set((state) => {
        state.eventById[date]!.events = state.eventById[date]!.events.filter(
          (e) => e.id !== id,
        )
      })
    },
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
    addList(title) {
      const list: ListType = {
        id: v4(),
        cards: [],
        title,
      }
      set((state) => {
        state.lists = get().lists.concat([list.id])
        state.listsById[list.id] = list
      })
    },
    setList(list) {
      set((state) => {
        state.listsById[list.id] = list
      })
    },
    moveList({ fromIndex, toIndex }) {
      set((state) => {
        state.lists[fromIndex] = get().lists[toIndex]!
        state.lists[toIndex] = get().lists[fromIndex]!
      })
    },
    addCard({ listId, title }) {
      const card: CardType = {
        title,
        id: v4(),
        createdAt: new Date(),
        listId,
        content: '',
      }
      set((state) => {
        state.listsById[listId]?.cards.push(card)
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
    updateCard(card) {
      const cardIndex = get().listsById[card.listId]!.cards.findIndex(
        (c) => c.id === card.id,
      )
      set((state) => {
        state.listsById[card.listId]!.cards[cardIndex] = card
      })
    },
    removeCardFromBoard({ listId, cardId }) {
      set((state) => {
        state.listsById[listId]!.cards = get().listsById[listId]!.cards.filter(
          (card) => card.id !== cardId,
        )
      })
    },
    removeListFromBoard(listId) {
      set((state) => {
        delete state.listsById[listId]
        state.lists = get().lists.filter((id) => id !== listId)
      })
    },
  })),
)
