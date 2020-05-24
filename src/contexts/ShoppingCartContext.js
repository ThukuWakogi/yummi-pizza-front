import React, { Component, createContext } from 'react'
import axios from 'axios'
import { localStorageTokenKey, apiUrl } from '../utils/variables'
import { handleCallbacks } from '../utils/functions'

export const ShoppingCartContext = createContext(null)

class ShoppingCartContextProvider extends Component {
  state = {
    addToCartDialogOpen: false,
    addingShoppingCartItem: false
  }

  getShoppingCart = () => {
    console.log('getting shopping cart')
  }

  setItemToShoppingCart = () => {
    this.setState({
      ...this.state,
      addToCartDialogOpen: true
    })
  }

  postItem = (pizza_id, pizza_quantity, updateOrder, callbacks) => {
    this.setState({
      ...this.state,
      addingShoppingCartItem: true
    })
    axios
      .post(
        `${apiUrl}/shopping-cart-item`,
        { pizza_id, pizza_quantity },
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem(localStorageTokenKey)}`,
            Accept: 'application/json'
          }
        }
      )
      .then(res => {
        console.log({res})
        updateOrder(res.data.pendingOrder, res.data.shoppingCart)
        handleCallbacks(callbacks)
        this.setState({
          ...this.state,
          addingShoppingCartItem: false,
          addToCartDialogOpen: false,
        })
      })
      .catch(err => {
        console.log({err})
        this.setState({
          ...this.state,
          addingShoppingCartItem: false
        })
      })
  }

  handleAddToCartDialogToggle = () => {
    this.setState({
      ...this.state,
      addToCartDialogOpen: this.state.addingShoppingCartItem ? true : !this.state.addToCartDialogOpen
    })
    console.log(this.state)
  }

  render() {
    return (
      <ShoppingCartContext.Provider
        value={{
          ...this.state,
          getShoppingCart: this.getShoppingCart,
          setItemToShoppingCart: this.setItemToShoppingCart,
          handleAddToCartDialogToggle: this.handleAddToCartDialogToggle,
          postItem: this.postItem
        }}
      >
        {this.props.children}
      </ShoppingCartContext.Provider>
    );
  }
}
 
export default ShoppingCartContextProvider;
