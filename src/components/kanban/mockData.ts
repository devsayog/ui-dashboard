import type { ListType } from './types'

export const listsData: ListType[] = [
  {
    id: 'exampleList1',
    title: 'Example list 1',
    cards: [
      {
        id: 'card1',
        content: '',
        title: 'Example card 1 title',
        listId: 'exampleList1',
        createdAt: new Date(),
      },
      {
        id: 'card2',
        content: '',
        title: 'Example card 2 title',
        listId: 'exampleList1',
        createdAt: new Date(),
      },
      {
        id: 'card3',
        content: '',
        title: 'Example card 3 title',
        listId: 'exampleList1',
        createdAt: new Date(),
      },
    ],
  },
  {
    id: 'exampleList2',
    title: 'Example list 2',
    cards: [
      {
        id: 'card4',
        content: '',
        title: 'Example card 4 title',
        listId: 'exampleList2',
        createdAt: new Date(),
      },
      {
        id: 'card5',
        content: '',
        title: 'Example card 5 title',
        listId: 'exampleList2',
        createdAt: new Date(),
      },
      {
        id: 'card6',
        content: '',
        title: 'Example card 6 title',
        listId: 'exampleList2',
        createdAt: new Date(),
      },
    ],
  },
]
