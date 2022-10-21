import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import type { CardType } from '../types'
import Card from './Card'

interface IDraggableCardProps {
  card: CardType
}
const DraggableCard = (props: IDraggableCardProps) => {
  const { card } = props
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
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
    <Card
      ref={setNodeRef}
      style={style}
      attributes={attributes}
      listeners={listeners}
      isDragging={isDragging}
      {...props}
    />
  )
}

export default DraggableCard
