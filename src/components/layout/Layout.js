import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Container } from '@material-ui/core';
import NavBar from './Navbar.js'
import PizzaPage from '../pages/PizzaPage';
import OrderPage from '../pages/OrderPage';

const Layout = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Container>
        <Switch>
          <Route exact path="/" component={PizzaPage}/>
          <Route path="/order" component={OrderPage}/>
        </Switch>
      </Container>
    </BrowserRouter>
  );
}
 
export default Layout;
