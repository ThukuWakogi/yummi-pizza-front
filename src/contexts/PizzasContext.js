import React, { Component, createContext } from 'react'
import axios from 'axios'

export const PizzasContext = createContext(null)

class PizzasContextProvider extends Component {
  getPizzas = async () => {
    let pizzas = null

    await axios
      .get('/pizza')
      .then(async res => {
        pizzas = res.data
      })
      .catch(err => {
        console.log(err)
      })

    return pizzas
  }

  render() { 
    return (
      <PizzasContext.Provider
        value={{
          getPizzas: this.getPizzas
        }}
      >
        {this.props.children}
      </PizzasContext.Provider>
    );
  }
}
 
export default PizzasContextProvider;
