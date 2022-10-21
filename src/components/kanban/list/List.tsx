import type { DraggableAttributes } from '@dnd-kit/core'
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import type { CSSProperties, Ref } from 'react'
import { forwardRef } from 'react'

import type { ListType } from '../types'

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

  // style for dragging list
  const dragStyle = props.isOverlay && 'origin-bottom-left rotate-3 scale-105'
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
              <p className="text-xl">{props.list.title}</p>
              {cards.map((card) => (
                <p key={card.id}>{card.title}</p>
              ))}
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
