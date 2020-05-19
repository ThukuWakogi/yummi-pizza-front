import React, { useContext } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import NavBar from './Navbar.js'
import PizzaPage from '../pages/PizzaPage'
import OrderPage from '../pages/OrderPage'
import AuthDialog from './Dialogs/AuthDialog'
import { AuthContext } from '../../contexts/AuthContext'

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(3),
    height: '100%'
  }
}))

const Layout = () => {
  const classes = useStyles()
  const { authDialogOpen, handleAuthDialogToggle, authAction, handleAuthDialogAction } = useContext(AuthContext)

  return (
    <BrowserRouter>
      <NavBar />
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
    </BrowserRouter>
  )
}
 
export default Layout
