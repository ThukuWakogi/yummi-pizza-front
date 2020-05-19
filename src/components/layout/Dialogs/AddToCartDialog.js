import React, { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import LinearProgress from '@material-ui/core/LinearProgress'
import pizzaClipArt from '../../../images/pizza-clipart-2.png'
import { ShoppingCartContext } from '../../../contexts/ShoppingCartContext'
import { AuthContext } from '../../../contexts/AuthContext'

const useStyles = makeStyles(theme => ({
  img: {
    height: 265,
    width: 400,
    objectFit: 'cover'
  },
  dialogContentText: {
    margin: 0
  }
}))

const AddToCartDialog = ({ pizza, open, handleToggle }) => {
  const classes = useStyles()
  const [state, setState] = useState({
    quantity: 1
  })
  const { postItem, addingShoppingCartItem } = useContext(ShoppingCartContext)
  const { updateOrderDetails } = useContext(AuthContext)

  const handleChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    postItem(pizza.id, state.quantity, updateOrderDetails)
  }

  return (
    <Dialog open={open} onClose={handleToggle}>
      <form noValidate onSubmit={handleSubmit}>
      <DialogTitle>{pizza.name}</DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.dialogContentText}>
            ${pizza.price} / £{(pizza.price * 0.91).toFixed(2)}
          </DialogContentText>
        </DialogContent>
        <img src={pizzaClipArt} alt={pizza.name} className={classes.img}/>
        <DialogContent>
          <div>
            <TextField
              margin="dense"
              name="quantity"
              label="quantity"
              type="number"
              fullWidth
              required
              value={state.quantity}
              disabled={addingShoppingCartItem}
              helperText={
                `Amounting to: $${
                  (pizza.price * (state.quantity ? state.quantity : 0)).toFixed(2)
                } / £${
                  ((pizza.price * 0.91) * (state.quantity ? state.quantity : 0)).toFixed(2)
                }`
              }
              onChange={handleChange}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleToggle}
            color="primary"
            disabled={addingShoppingCartItem}
          >Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={addingShoppingCartItem}
          >
            Add
          </Button>
        </DialogActions>
      </form>
      {
        addingShoppingCartItem ? <LinearProgress /> : null
      }
    </Dialog>
  );
}
 
export default AddToCartDialog;
