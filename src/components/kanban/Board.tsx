/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
import type { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import {
  closestCenter,
  DndContext,
  DragOverlay,
  MeasuringStrategy,
  MouseSensor,
  useSensor,
} from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { useAppStore } from '@/hooks/useAppStore'

import Card from './card/Card'
import DraggableList from './list/DraggableList'
import List from './list/List'
import { listsData } from './mockData'
import type { CardType, ListsByIdType } from './types'
import { findCardById, findContainer, getNewIndex } from './utils/dndUtils'

const Board = () => {
  const boardStore = useAppStore()

  useEffect(() => boardStore.initBoard(listsData), [])

  const [activeId, setActiveId] = useState<string | null>(null)
  const [activeCard, setActiveCard] = useState<CardType | null>(null)
  const [clonedItems, setClonedItems] = useState<ListsByIdType | null>(null)

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  })

  const setInActive = () => {
    setActiveId(null)
    setActiveCard(null)
  }

  const isList = (id: string) => {
    return boardStore.lists.includes(id)
  }

  const handleDragStart = (e: DragStartEvent) => {
    const { active } = e
    const draggedItemId = active.id as string
    setActiveId(draggedItemId)
    if (!isList(draggedItemId)) {
      const card = findCardById(draggedItemId, boardStore.listsById)
      if (card) setActiveCard(card)
    }
    setClonedItems(boardStore.listsById)
  }
  const handleDragOver = ({ active, over }: DragOverEvent) => {
    const overId = over?.id
    if (over === null || isList(active.id as string)) {
      return
    }
    const [overListId, activeListId] = [
      findContainer(overId as string, boardStore.listsById),
      findContainer(active.id as string, boardStore.listsById),
    ]

    if (!overListId || !activeListId) {
      return
    }
    const overDifferentList = activeListId !== overListId
    const overCurrentList = activeListId === overListId

    if (!(overCurrentList || overDifferentList)) {
      return
    }
    const overList = boardStore.listsById[overListId]!
    const overListCardIndex = overList.cards.findIndex(
      (card) => card.id === overId,
    )

    const newIndex = getNewIndex(overListCardIndex, over, active)

    const updateParams = {
      cardId: active.id as string,
      pos: newIndex,
    }
    if (overCurrentList) {
      boardStore.moveCard({
        list: boardStore.listsById[activeListId]!,
        ...updateParams,
      })
      return
    }
    boardStore.moveCardToList({
      fromList: boardStore.listsById[activeListId]!,
      toList: overList!,
      ...updateParams,
    })
  }
  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id in boardStore.listsById && over?.id) {
      const activeIndex = boardStore.lists.indexOf(active.id as string)
      const overIndex = boardStore.lists.indexOf(over.id as string)
      boardStore.moveList({
        fromIndex: activeIndex,
        toIndex: overIndex,
      })
    }
    setInActive()
  }
  const handleDragCancel = () => {
    if (clonedItems) {
      boardStore.setListsById(clonedItems)
    }
    setInActive()
    setClonedItems(null)
  }
  const renderListOverlay = (listId: string) => {
    const list = boardStore.listsById[listId]!
    return <List isOverlay list={list} />
  }
  const renderCardDragOverlay = () => {
    if (activeCard) {
      return <Card isOverlay card={activeCard} />
    }
  }

  return boardStore.lists.length > 0 ? (
    <DndContext
      sensors={[mouseSensor]}
      collisionDetection={closestCenter}
      measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
      onDragCancel={handleDragCancel}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-full overflow-x-auto">
        <div className="mb-5 flex h-full w-full flex-nowrap gap-4">
          <SortableContext items={boardStore.lists}>
            {boardStore.lists.map((listId) => (
              <DraggableList
                list={boardStore.listsById[listId]!}
                key={listId}
              />
            ))}
          </SortableContext>
        </div>
      </div>
      {typeof window !== 'undefined'
        ? createPortal(
            <DragOverlay
              dropAnimation={{
                duration: 25,
                easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
              }}
            >
              {activeId
                ? isList(activeId)
                  ? renderListOverlay(activeId)
                  : renderCardDragOverlay()
                : null}
            </DragOverlay>,
            document.body,
          )
        : null}
    </DndContext>
  ) : (
    <p className="text2xl text-red-400">No Board</p>
  )
}

export default Board
