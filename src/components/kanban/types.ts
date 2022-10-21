export type CardType = {
  id: string
  content: string
  title: string
  listId: string
  createdAt: Date
}
export type ListType = {
  id: string
  title: string
  cards: CardType[]
}
export type ListsByIdType = {
  [listId: string]: ListType
}
