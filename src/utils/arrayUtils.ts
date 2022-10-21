type Id = {
  id: string
}
export const listToObj = <T extends Id>(arr: T[]) => {
  return arr.reduce((acc: { [key: string]: T }, cur) => {
    acc[cur.id] = cur
    return acc
  }, {})
}
