/* eslint-disable no-param-reassign */
import {
  closestCenter,
  getFirstCollision,
  pointerWithin,
  rectIntersection,
} from '@dnd-kit/core'
import type { MutableRefObject } from 'react'

import type { ListsByIdType } from '../types'

export const customCollisionStrategy = (
  args: any,
  opts: {
    activeId: string | null
    items: ListsByIdType
    lastOverId: MutableRefObject<any>
    recentlyMovedToNewContainer: MutableRefObject<boolean>
  },
) => {
  if (opts.activeId && opts.activeId in opts.items) {
    return closestCenter({
      ...args,
      droppableContainers: args.droppableContainers.filter(
        (container: any) => container.id in opts.items,
      ),
    })
  }

  const pointerIntersections = pointerWithin(args)
  const intersections =
    pointerIntersections.length > 0
      ? pointerIntersections
      : rectIntersection(args)

  let overId = getFirstCollision(intersections, 'id')

  if (overId != null) {
    if (overId in opts.items) {
      const containerItems = opts.items[overId]
      if (containerItems!.cards.length > 0) {
        overId =
          closestCenter({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              (container: any) =>
                container.id !== overId &&
                !!containerItems!.cards.find(
                  (card) => card.id === container.id,
                ),
            ),
          })[0]?.id ?? null
      }
    }

    opts.lastOverId.current = overId

    return [{ id: overId }]
  }

  if (opts.recentlyMovedToNewContainer.current) {
    opts.lastOverId.current = opts.activeId
  }

  return opts.lastOverId.current ? [{ id: opts.lastOverId.current }] : []
}
