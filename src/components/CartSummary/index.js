import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const amountArray = []
      cartList.map(eachItem =>
        amountArray.push(eachItem.quantity * eachItem.price),
      )
      console.log(amountArray)
      let totalAmount = 0
      if (amountArray.length !== 0) {
        totalAmount = amountArray.reduce((total, amount) => total + amount)
      }

      return (
        <>
          <h1>Order Total: Rs {totalAmount}/-</h1>
          <p>{cartList.length} Items in Cart</p>
          <button type="button">Checkout</button>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
