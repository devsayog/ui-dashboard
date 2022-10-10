import { useState } from 'react'
import { MdEdit } from 'react-icons/md'

import { flatten } from '@/utils/flattenObj'

import OrderDetails from './OrderDetails'
import OrderForm from './OrderForm'

type OrderDetailsProps = {
  order: {
    id: string
    name: string
    totalPrice: number
    customer: {
      name: string
      address: string
    }
    status: string
    date: string
    products: {
      image: string
      title: string
      price: number
      qty: number
    }[]
  }
  closeModal?: VoidFunction
}
const Index = ({ order }: OrderDetailsProps) => {
  const [showDetails, setShowDetails] = useState(true)

  return (
    <>
      <div className="my-3 flex items-center justify-between">
        <h3 className="heading2 uppercase">{order.name}</h3>
        {showDetails && (
          <button
            type="button"
            className="focus flex h-9 w-9 items-center justify-center rounded-full bg-teal-700 p-1.5 text-gray-200 transition hover:scale-105"
            onClick={() => setShowDetails(false)}
          >
            <MdEdit className="text-2xl" />
            <p className="sr-only">Edit {order.name} order</p>
          </button>
        )}
      </div>
      {showDetails ? (
        <OrderDetails order={order} />
      ) : (
        <OrderForm
          initialState={flatten(order) as any}
          closeEditingState={() => setShowDetails(true)}
        />
      )}
    </>
  )
}

export default Index
