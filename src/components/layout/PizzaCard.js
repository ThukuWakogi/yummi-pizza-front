import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import pizzaClipArt from '../../images/pizza-clipart-2.png'
import { AuthContext } from '../../contexts/AuthContext'
import { ShoppingCartContext } from '../../contexts/ShoppingCartContext'

const useStyles = makeStyles({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  media: {
    height: 140,
  },
  cardActionArea: {
    marginBottom: 'auto'
  }
})

const PizzaCard = ({ pizza, handlePizzaSelection }) => {
  const classes = useStyles()
  const { isAuthenticated, handleAuthDialogOpen } = useContext(AuthContext)
  const { setItemToShoppingCart } = useContext(ShoppingCartContext)

  const handleAddToCart = () => {
    handlePizzaSelection(pizza)
    isAuthenticated
      ? setItemToShoppingCart()
      : handleAuthDialogOpen('login', [setItemToShoppingCart])
  }

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.cardActionArea}>
        <CardMedia
          className={classes.media}
          image={pizzaClipArt}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {pizza.name}
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p" gutterBottom>
            {pizza.description}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            ${pizza.price} / £{(pizza.price * 0.91).toFixed(2)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  )
}
 
export default PizzaCard