import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import type { ListType } from '../types'
import List from './List'

interface IDraggableListProps {
  list: ListType
}
const DraggableList = (props: IDraggableListProps) => {
  const {
    attributes,
    listeners,
    node,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props.list.id,
    data: {
      type: 'container',
      children: props.list.cards.map((card) => card.id),
    },
    transition: {
      duration: 150,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    },
  })
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  }
  return (
    <List
      isDragging={isDragging}
      height={node.current?.children[0]?.clientHeight}
      ref={setNodeRef}
      style={style}
      attributes={attributes}
      listeners={listeners}
      {...props}
    />
  )
}

export default DraggableList
