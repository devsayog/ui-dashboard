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
export type MoveCardParams = {
  cardId: string
  list: ListType
  pos: number
}
export type MoveCardToListParams = {
  cardId: string
  fromList: ListType
  toList: ListType
  pos: number
}
export type MoveListParams = {
  fromIndex: number
  toIndex: number
}
export type AddCardParams = {
  title: string
  listId: string
}
export type RemoveCardFromBoardParams = {
  listId: string
  cardId: string
}
