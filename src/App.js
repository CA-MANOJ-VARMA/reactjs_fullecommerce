import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  removeCartItem = id => {
    const {cartList} = this.state
    const index = cartList.filter(eachItem => eachItem.id === id)
    cartList.splice(index, 1)
    this.setState({cartList})
  }

  addCartItem = product => {
    const {cartList} = this.state
    console.log(product)
    const isProductAdded = cartList.findIndex(
      eachItem => eachItem.id === product.id,
    )
    console.log(isProductAdded)
    if (isProductAdded === -1) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      this.incrementCartItemQuantity(product.id)
    }
    //   TODO: Update the code here to implement addCartItem
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
    //   TODO: Update the code here to implement addCartItem
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const cartItem = cartList.filter(eachItem => eachItem.id === id)
    const cartItemIndex = cartList.findIndex(eachItem => eachItem.id === id)

    const quantity = cartItem[0].quantity + 1
    cartItem.quantity = quantity

    cartList[cartItemIndex].quantity = quantity
    console.log(cartList)
    this.setState({cartList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const cartItem = cartList.filter(eachItem => eachItem.id === id)
    const cartItemIndex = cartList.findIndex(eachItem => eachItem.id === id)

    const quantity = cartItem[0].quantity - 1
    cartItem.quantity = quantity

    cartList[cartItemIndex].quantity = quantity
    console.log(cartList)
    if (quantity >= 1) {
      this.setState({cartList})
    } else {
      const Index = cartList.findIndex(eachItem => eachItem.id === id)
      cartList.splice(Index, 1)
      this.setState({cartList})
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
