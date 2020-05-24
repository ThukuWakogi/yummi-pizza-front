import React, { useContext, useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import NavBar from './Navbar.js'
import PizzaPage from '../pages/PizzaPage/PizzaPage'
import OrderPage from '../pages/OrderPage/OrderPage'
import AuthDialog from './Dialogs/AuthDialog'
import ShoppingCartDialog from './Dialogs/ShoppingCartDialog'
import { AuthContext } from '../../contexts/AuthContext'
import ProgressComponent from './ProgressComponent'

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(3),
    height: '89%'
  }
}))

const Layout = () => {
  const classes = useStyles()
  const [state, setState] = useState({
    shoppingCartDialog: false
  })
  const {
    authDialogOpen,
    handleAuthDialogToggle,
    authAction,
    handleAuthDialogAction,
    fetchAuthenticatedUser,
    initialUserLoad
  } = useContext(AuthContext)

  const handleToggle = () => {
    setState({
      shoppingCartDialog: !state.shoppingCartDialog
    })
  }

  useEffect(() => {
    fetchAuthenticatedUser()
  }, [fetchAuthenticatedUser])

  return (
    <BrowserRouter>
      <NavBar shoppingCartDialogToggle={handleToggle}/>
      <Container className={classes.container}>
        {
          initialUserLoad
            ? <Switch>
                <Route exact path="/" component={PizzaPage}/>
                <Route path="/order" component={OrderPage}/>
              </Switch>
            : <ProgressComponent />
        }
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
