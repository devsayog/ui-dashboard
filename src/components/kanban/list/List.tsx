import type { DraggableAttributes } from '@dnd-kit/core'
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import type { CSSProperties, Ref } from 'react'
import { forwardRef, useRef } from 'react'

import { useAppStore } from '@/hooks/useAppStore'

import AddCardorList from '../AddCardOrList'
import DraggableCard from '../card/DraggableCard'
import type { ListType } from '../types'
import Editable from './EditableTitle'

interface IListPropsType {
  height?: number
  isDragging?: boolean
  list: ListType
  style?: CSSProperties
  attributes?: DraggableAttributes
  listeners?: SyntheticListenerMap | undefined
  isOverlay?: boolean
}

const List = forwardRef((props: IListPropsType, ref: Ref<HTMLDivElement>) => {
  const { cards } = props.list
  const boardStore = useAppStore()
  const inputRef = useRef<HTMLInputElement>(null)

  // style for dragging list
  const dragStyle = props.isOverlay && 'origin-bottom-left rotate-3 scale-105'

  const updateTitle = () => {
    const text = inputRef.current?.value
    if (text === '') return
    const updatedList = { ...props.list, title: text || props.list.title }
    boardStore.setList(updatedList)
  }
  return props.list ? (
    <div
      ref={ref}
      style={props.style}
      {...props.attributes}
      {...props.listeners}
      className="w-72 shrink-0"
    >
      {!props.isDragging ? (
        <div
          className={`origin-bottom-left self-start rounded bg-slate-800 shadow-lg ${dragStyle}`}
        >
          <SortableContext items={cards} strategy={verticalListSortingStrategy}>
            <div className="w-full p-2">
              <div className="mb-4 flex w-full items-center">
                <Editable
                  text={props.list.title}
                  placeholder="Write a title"
                  childRef={inputRef}
                  handleSubmit={updateTitle}
                >
                  <input
                    ref={inputRef}
                    type="text"
                    name="task"
                    placeholder="Write a task name"
                    defaultValue={props.list.title}
                    className="m-0 w-full rounded border bg-slate-600 p-0 text-lg font-medium text-gray-200"
                  />
                </Editable>
                <p>MENU</p>
              </div>
              {(cards || []).map((card) => (
                <DraggableCard card={card} key={card.id} />
              ))}
              <AddCardorList type="card" listId={props.list.id} />
            </div>
          </SortableContext>
        </div>
      ) : (
        // show when list is dragged
        <div
          style={{ height: `${props.height}px` }}
          className="origin-bottom-left self-start rounded bg-slate-400 shadow-lg"
        />
      )}
    </div>
  ) : null
})

List.displayName = 'List'
export default List
