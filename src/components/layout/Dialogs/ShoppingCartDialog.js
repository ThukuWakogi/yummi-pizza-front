import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { AuthContext } from '../../../contexts/AuthContext'
import pizzaClipArt from '../../../images/pizza-clipart-2.png'
import { totalPrice } from '../../../utils/functions'

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    '& > h6': {
      margin: theme.spacing(4)
    }
  },
  img: {
    height: 110,
    width: 110,
    objectFit: 'cover'
  },
  table: {
    '& > tbody > tr > td:last-child': {
      display: 'block',
      marginLeft: theme.spacing(1)
    }
  },
  actions: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    '& > .total-price': {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing(1)
    },
    '& > .action-buttons > button': {
      marginLeft: theme.spacing(1)
    }
  }
}))

const ShoppingCartDialog = ({ open, handleToggle }) => {
  const { authenticatedUser } = useContext(AuthContext)
  const classes = useStyles()

  const _totalPrice = authenticatedUser ? totalPrice(authenticatedUser.shoppingCart) : 0

  return (
    <Dialog open={open} onClose={handleToggle} scroll='paper'>
      {
        authenticatedUser
          ? authenticatedUser.shoppingCart.length > 0
            ? <>
                <DialogTitle>Shopping Cart</DialogTitle>
                <DialogContent dividers>
                  <table className={classes.table}>
                    <tbody>
                      {
                        authenticatedUser.shoppingCart.map(item => (
                          <tr key={item.id}>
                            <td>
                              <img src={pizzaClipArt} alt={item.pizza.name} className={classes.img}/>
                            </td>
                            <td>
                              <Typography variant='body1'>
                                {item.pizza.name}
                              </Typography>
                              <Typography variant='body1'>
                                {`quantity: ${item.pizza_quantity}`}
                              </Typography>
                              <Typography variant='body1'>
                                {`$${
                                  (item.pizza.price * item.pizza_quantity).toFixed(2)
                                } / £${
                                  (item.pizza.price * 0.91 * item.pizza_quantity).toFixed(2)
                                }`}
                              </Typography>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </DialogContent>
              </>
            : <div className={classes.container}>
                <Typography variant="h6">Your cart is empty</Typography>
              </div>
          : null
      }
      <DialogActions className={classes.actions}>
        {
          authenticatedUser
          ? authenticatedUser.shoppingCart.length > 0
            ? <div className="total-price">
                <Typography variant="subtitle1">Total Price</Typography>
                <Typography variant="h6">
                  {`$${_totalPrice.toFixed(2)} / £${(_totalPrice * 0.91).toFixed(2)}`}
                </Typography>
              </div>
            : null
          : null
        }
        <div className='action-buttons'>
          <Button onClick={handleToggle}>Close</Button>
          {
            authenticatedUser
              ? authenticatedUser.shoppingCart.length > 0
                ? <Button variant="contained" color="primary">Check Out</Button>
                : null
              : null
          }
        </div>
      </DialogActions>
    </Dialog>
  );
}
 
export default ShoppingCartDialog;
