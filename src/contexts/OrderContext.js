import React, { Component, createContext } from 'react'
import axios from 'axios'
import { handleCallbacks } from '../utils/functions'
import { localStorageTokenKey, apiUrl } from '../utils/variables'

export const OrderContext = createContext(null)

class OrderContextProvider extends Component {
  state = {
    checkingOut: false
  }
  checkout = (orderId, callbacks) => {
    console.log({orderId})
    this.setState({
      checkingOut: true
    })
    axios
      .put(
        `${apiUrl}/order/${orderId}`,
        { checked_out: 1 },
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem(localStorageTokenKey)}`,
            Accept: 'application/json'
          }
        }
      )
      .then(res => {
        this.setState({
          checkingOut: false
        })
        handleCallbacks(callbacks)
      })
      .catch(err => {
        this.setState({
          checkingOut: false
        })
      })
  }

  render() {
    return (
      <OrderContext.Provider value={{
        ...this.state,
        checkout: this.checkout
      }}>
        {this.props.children}
      </OrderContext.Provider>
    )
  }
}
 
export default OrderContextProvider;
