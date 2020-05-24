import React, { useContext, useEffect } from 'react'
import clsx from 'clsx'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CircularProgress from '@material-ui/core/CircularProgress'
import { AuthContext } from '../../../contexts/AuthContext'
import { OrderContext } from '../../../contexts/OrderContext'
import PizzaClipArt from '../../../images/pizza-clipart-2.png'
import { totalPrice } from '../../../utils/functions'

const useStyles = makeStyles(theme => ({
  maxWidthHeight: {
    width: '100%',
    height: '100%',
  },
  maxWidth: {
    width: '100%',
  },
  loginDiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& > div': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      '& > button': {
        margin: '16px auto'
      }
    }
  },
  card: {
    display: 'flex'
  },
  image: {
    width: 150,
    height: 150,
    objectFit: 'cover'
  },
  totalPrice: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
    '& > h6': {
      marginRight: theme.spacing(2)
    }
  },
  actions: {
    margin: theme.spacing(1, 0),
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    '& > button': {
      marginLeft: theme.spacing(1)
    }
  }
}))

const OrderPage = () => {
  const {
    authenticatedUser,
    isAuthenticated,
    initialUserLoad,
    handleAuthDialogOpen,
    updateOrderDetails
  } = useContext(AuthContext)
  const { checkout, checkingOut } = useContext(OrderContext)
  const classes = useStyles()
  const history = useHistory()

  useEffect(() => {
    if (initialUserLoad && !isAuthenticated) {
      handleAuthDialogOpen('login')
    }
  }, [initialUserLoad, isAuthenticated, handleAuthDialogOpen])

  const _totalPrice = authenticatedUser ? totalPrice(authenticatedUser.shoppingCart) : 0

  return (
    <>
      {
        isAuthenticated
          ? <>
              {
                authenticatedUser
                  ? <Typography variant="body1">{authenticatedUser.name}</Typography>
                  : null
              }
              <>
                <div className={classes.totalPrice}>
                  <Typography variant="subtitle1">Total Price:</Typography>
                  <Typography variant="h6">
                    {`$${_totalPrice.toFixed(2)} / £${(_totalPrice * 0.91).toFixed(2)}`}
                  </Typography>
                </div>
                <Grid container spacing={2} className={classes.maxWidth}>
                  {
                    authenticatedUser.shoppingCart.map(item => (
                      <Grid item xs={12} sm={6} key={item.id}>
                        <Card className={classes.card}>
                          <CardMedia className={classes.image} image={PizzaClipArt} />
                          <CardContent>
                            <Typography variant="subtitle1">{item.pizza.name}</Typography>
                              <Typography variant="subtitle1">
                                {`quantity: ${item.pizza_quantity}`}
                              </Typography>
                              <Typography variant="subtitle1">
                                {`$${
                                  (item.pizza.price * item.pizza_quantity).toFixed(2)
                                } / £${
                                  (item.pizza.price * 0.91 * item.pizza_quantity).toFixed(2)
                                }`}
                              </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))
                  }
                </Grid>
                <div className={clsx(classes.maxWidth, classes.actions)}>
                  {
                    checkingOut
                      ? <CircularProgress size={30}/>
                      : null
                  }
                  <Button
                    variant="contained"
                    color="primary"
                    to="/order"
                    onClick={() => {
                      checkout(
                        authenticatedUser.pendingOrder[0].id,
                        [
                          () => updateOrderDetails([], []),
                          () => history.push('/')
                        ]
                      )
                    }}
                    disabled={checkingOut}
                  >
                    Check Out
                  </Button>
                </div>
              </>
            </>
          : <div className={clsx(classes.maxWidthHeight, classes.loginDiv)}>
              <div>
                <Typography variant="h4">login to view your cart</Typography>
                <Button
                  variant='outlined'
                  onClick={() => handleAuthDialogOpen('login')}
                  color="primary"
                >login</Button>
              </div>
            </div>
      }
      
    </>
  );
}
 
export default OrderPage;
