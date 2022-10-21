import { DndContext } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { useEffect } from 'react'

import { useAppStore } from '@/hooks/useAppStore'

import DraggableList from './list/DraggableList'
import { listsData } from './mockData'

const Board = () => {
  const boardStore = useAppStore()

  useEffect(() => boardStore.initBoard(listsData), [])

  return boardStore.lists.length > 0 ? (
    <DndContext>
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
    </DndContext>
  ) : (
    <p className="text2xl text-red-400">No Board</p>
  )
}

export default Board
