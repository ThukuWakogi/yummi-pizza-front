import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Layout from './components/layout/Layout'
import AuthContextProvider from './contexts/AuthContext'

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
        <CssBaseline />
        <Layout />
      </AuthContextProvider>
    </div>
  )
}

export default App
