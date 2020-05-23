import React, { useContext, useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import NavBar from './Navbar.js'
import PizzaPage from '../pages/PizzaPage'
import OrderPage from '../pages/OrderPage'
import AuthDialog from './Dialogs/AuthDialog'
import ShoppingCartDialog from './Dialogs/ShoppingCartDialog'
import { AuthContext } from '../../contexts/AuthContext'

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(3),
    height: '100%'
  }
}))

const Layout = () => {
  const classes = useStyles()
  const [state, setState] = useState({
    shoppingCartDialog: false
  })
  const { authDialogOpen, handleAuthDialogToggle, authAction, handleAuthDialogAction } = useContext(AuthContext)

  const handleToggle = () => {
    setState({
      shoppingCartDialog: !state.shoppingCartDialog
    })
  }

  return (
    <BrowserRouter>
      <NavBar shoppingCartDialogToggle={handleToggle}/>
      <Container className={classes.container}>
        <Switch>
          <Route exact path="/" component={PizzaPage}/>
          <Route path="/order" component={OrderPage}/>
        </Switch>
      </Container>
      <AuthDialog
        authDialogOpen={authDialogOpen}
        handleToggle={handleAuthDialogToggle}
        authAction={authAction}
        handleDialogAction={handleAuthDialogAction}
      />
      <ShoppingCartDialog
        open={state.shoppingCartDialog}
        handleToggle={handleToggle}
      />
    </BrowserRouter>
  )
}
 
export default Layout
