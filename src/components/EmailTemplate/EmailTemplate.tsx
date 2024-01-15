import { CartState } from '../../../types'

export default function EmailTemplate({ cartList, totalPrice }: CartState) {
  return (
    <>
      <table
        style={{ borderCollapse: 'collapse', width: '100%', marginTop: '10px', color: 'black' }}
      >
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ border: ' 1px solid #ddd', padding: '8px' }}>Number</th>
            <th style={{ border: ' 1px solid #ddd', padding: '8px' }}>ID</th>
            <th style={{ border: ' 1px solid #ddd', padding: '8px' }}>Title</th>
            <th style={{ border: ' 1px solid #ddd', padding: '8px' }}>Quantity</th>
            <th style={{ border: ' 1px solid #ddd', padding: '8px' }}>Price</th>
            <th style={{ border: ' 1px solid #ddd', padding: '8px' }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {cartList.map((cartItem, index) => {
            const {
              product: { id, title, price },
              quantity,
            } = cartItem

            return (
              <tr key={id}>
                <td style={{ border: ' 1px solid #ddd', padding: '5px' }}>{index + 1}</td>
                <td style={{ border: ' 1px solid #ddd', padding: '5px' }}>{id}</td>
                <td style={{ border: ' 1px solid #ddd', padding: '5px' }}>{title}</td>
                <td style={{ border: ' 1px solid #ddd', textAlign: 'right', padding: '5px' }}>
                  {quantity}
                </td>
                <td style={{ border: ' 1px solid #ddd', textAlign: 'right', padding: '5px' }}>
                  {price} $
                </td>
                <td style={{ border: ' 1px solid #ddd', textAlign: 'right', padding: '5px' }}>
                  {(price * quantity).toFixed(2)} $
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div style={{ marginLeft: 'auto', marginRight: '0', marginTop: '10px' }}>
        <span style={{ paddingRight: '15px', fontWeight: 'bold', fontSize: '18px' }}>
          Total Price:
        </span>
        <span style={{ fontWeight: 'bold', fontSize: '18px' }}>{totalPrice.toFixed(2)} $</span>
      </div>
    </>
  )
}
