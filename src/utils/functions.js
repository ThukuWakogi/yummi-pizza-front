export const handleCallbacks = (callbacks) => {
  if (Array.isArray(callbacks)) callbacks.forEach(callback => callback())
}

export const totalPrice = (shoppingCart = []) => {
  let returningPrice = 0

  shoppingCart.forEach(item => {
    returningPrice += item.pizza.price * item.pizza_quantity
  })

  return returningPrice
}
