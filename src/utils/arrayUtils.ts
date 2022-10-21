type Id = {
  id: string
}
export const listToObj = <T extends Id>(arr: T[]) => {
  return arr.reduce((acc: { [key: string]: T }, cur) => {
    acc[cur.id] = cur
    return acc
  }, {})
}
export const getById = <T extends Id>(items: T[], id: string) =>
  items.find((item) => item.id === id)

export const removeById = <T extends Id>(items: T[], id: string) =>
  items.filter((item) => item.id !== id)

export const insert = <T extends Id>(items: T[], item: T, index: number) => {
  const cloned = structuredClone(items)
  cloned.splice(index, 0, item)
  return cloned
}
