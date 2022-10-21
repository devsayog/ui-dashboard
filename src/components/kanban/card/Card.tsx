import type { DraggableAttributes } from '@dnd-kit/core'
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
import type { CSSProperties, Ref } from 'react'
import React, { forwardRef } from 'react'
import { BiEdit } from 'react-icons/bi'

import AppDialog from '@/components/common/AppDialog'

import type { CardType } from '../types'
import CardInfo from './CardInfo'

interface ICardPropsType {
  isDragging?: boolean
  card: CardType
  style?: CSSProperties
  attributes?: DraggableAttributes
  listeners?: SyntheticListenerMap | undefined
  isOverlay?: boolean
}

const CardContent = ({
  card,
  isOverlay,
  portal,
}: {
  card: CardType
  isOverlay: boolean | undefined
  portal?: boolean
}) => {
  const dragStyle = isOverlay && 'origin-bottom-left rotate-3 scale-105'

  return (
    <div
      className={`${
        portal && 'opacity-50'
      } w-full cursor-pointer rounded bg-slate-600 p-2 text-gray-300 shadow-sm hover:bg-slate-700 hover:text-gray-200 ${dragStyle}`}
    >
      <h3 className="text-gray-200">{card.title}</h3>
      <h3 aria-hidden="true" className="my-1 border-gray-500" />
      <div className="flex w-full items-center justify-between">
        <p className="text-sm">
          {card.createdAt.toISOString().slice(0, 10).replaceAll('-', '/')}
        </p>
        <AppDialog
          size="max-w-md"
          edit
          trigger={<BiEdit className="text-base" />}
          title={`Actions :- ${card.title}`}
        >
          <CardInfo card={card} />
        </AppDialog>
      </div>
    </div>
  )
}

const Card = forwardRef((props: ICardPropsType, ref: Ref<HTMLDivElement>) => {
  return (
    <div
      className="mb-2"
      style={props.style}
      {...props.attributes}
      {...props.listeners}
      ref={ref}
    >
      {!props.isDragging ? (
        <CardContent isOverlay={props.isOverlay} card={props.card} />
      ) : (
        <CardContent portal isOverlay={props.isOverlay} card={props.card} />
      )}
    </div>
  )
})
Card.displayName = 'Card'
export default Card
