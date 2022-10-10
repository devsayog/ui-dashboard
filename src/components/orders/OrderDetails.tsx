import Image from 'next/image'

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
}
const OrderDetails = ({ order }: OrderDetailsProps) => {
  return (
    <div>
      <p className="my-2 text-lg font-bold">DETAILS</p>
      <ul className="mt-4 space-y-2 divide-y divide-gray-800">
        <li className="text-lg">
          <strong>ID:</strong> {order.id}
        </li>
        <li className="text-lg">
          <strong>Number:</strong>{' '}
          <span className="uppercase">{order.name}</span>
        </li>
        <li className="text-lg">
          <strong>Customer:</strong> {order.customer.name}
        </li>
        <li className="text-lg">
          <strong>Address:</strong> {order.customer.address}
        </li>
        <li className="text-lg">
          <strong>Date:</strong> {order.date}
        </li>
        <li className="text-lg">
          <strong>Total Amount:</strong> $ {order.totalPrice}
        </li>
        <li className="text-lg">
          <strong>Status:</strong> {order.status}
        </li>
      </ul>
      <p className="my-3 text-lg font-bold">Products</p>
      <table className="table">
        <thead className="table__head">
          <tr>
            <th className="p-1.5">Description</th>
            <th className="p-1.5">Quantity</th>
            <th className="p-1.5">Amount</th>
          </tr>
        </thead>
        <tbody className="table__body">
          {order.products.map((item) => (
            <tr className="table__row-body" key={item.title}>
              <td className="flex items-center gap-1 py-1 px-1.5">
                <Image
                  src={item.image}
                  alt={item.title}
                  layout="fixed"
                  height="40"
                  width="40"
                  className="rounded-md object-cover"
                />
                <p>{item.title}</p>
              </td>
              <td className="py-1 px-1.5">{item.qty}</td>
              <td className="py-1 px-1.5">$ {item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrderDetails
