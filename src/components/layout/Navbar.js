import React, { useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { AuthContext } from '../../contexts/AuthContext'
import AuthDialog from './Dialogs/AuthDialog'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

export default function Navbar() {
  const classes = useStyles()
  const { isAuthenticated, authenticatedUser } = useContext(AuthContext)
  // const [authDialogOpen, setAuthDialogOpen] = useState(false)
  // const [refAuthAction, setRefAuthAction] = useState(null)
  const [authDialogData, setAuthDialogData] = useState({
    authDialogOpen: false,
    authAction: null
  })

  const handleAuthDialogOpen = authAction => {
    setAuthDialogData({
      authDialogOpen: true,
      authAction: authAction ? authAction : authDialogData.authAction
    })
  }

  const handleAuthDialogToggle = () => {
    setAuthDialogData({
      ...authDialogData,
      authDialogOpen: !authDialogData.authDialogOpen
    })
  }

  const handleAuthDialogAction = (event, authAction) => {
    event.preventDefault()
    setAuthDialogData({ ...authDialogData, authAction })
  }

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Yummi Pizza
            </Typography>
            <Button
              color="inherit"
              onClick={() => {
                handleAuthDialogOpen('login')
              }}
            >
              Login
            </Button>
            <Button color="inherit" onClick={() => handleAuthDialogOpen('register')}>Register</Button>
          </Toolbar>
        </AppBar>
      </div>
      <AuthDialog
        authDialogOpen={authDialogData.authDialogOpen}
        handleToggle={handleAuthDialogToggle}
        authAction={authDialogData.authAction}
        handleDialogAction={handleAuthDialogAction}
      />
    </>
  )
}