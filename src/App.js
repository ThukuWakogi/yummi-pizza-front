import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Layout from './components/layout/Layout'
import AuthContextProvider from './contexts/AuthContext'
import PizzasContextProvider from './contexts/PizzasContext'
import ShoppingCartContextProvider from './contexts/ShoppingCartContext'

const useStyles = makeStyles(theme => ({
  app: {
    height: '100%'
  }
}))

function App() {
  const classes = useStyles()

  return (
    <div className={clsx('App', classes.app)}>
      <AuthContextProvider>
        <PizzasContextProvider>
          <ShoppingCartContextProvider>
            <CssBaseline />
            <Layout />
          </ShoppingCartContextProvider>
        </PizzasContextProvider>
      </AuthContextProvider>
    </div>
  )
}

export default App
