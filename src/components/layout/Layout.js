import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import NavBar from './Navbar.js'
import PizzaPage from '../pages/PizzaPage'
import OrderPage from '../pages/OrderPage'

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(3)
  }
}))

const Layout = () => {
  const classes = useStyles()

  return (
    <BrowserRouter>
      <NavBar />
      <Container className={classes.container}>
        <Switch>
          <Route exact path="/" component={PizzaPage}/>
          <Route path="/order" component={OrderPage}/>
        </Switch>
      </Container>
    </BrowserRouter>
  )
}
 
export default Layout
