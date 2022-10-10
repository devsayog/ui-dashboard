export const flatten = (
  obj: Record<string, unknown>,
  parent: string | null = null,
): Record<string, unknown> =>
  Object.keys(obj).reduce(
    (acc, cur) =>
      typeof obj[cur] === 'object' && !Array.isArray(obj[cur])
        ? { ...acc, ...flatten(obj[cur] as Record<string, unknown>, cur) }
        : { ...acc, [(parent ? `${parent}.` : '') + cur]: obj[cur] },
    {},
  )
