export type EventType = {
  id: string
  date: string
  title: string
  description: string
}
export type EventListType = {
  events: EventType[]
}
export type EventByIdType = {
  [date: string]: EventListType
}
export type AddEventType = {
  date: string
  title: string
  description: string
}
export type DeleteEventType = {
  date: string
  id: string
}
