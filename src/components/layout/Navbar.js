import React, { useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import CircularProgress from '@material-ui/core/CircularProgress'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { AuthContext } from '../../contexts/AuthContext'

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
  const {
    isAuthenticated,
    fetchAuthenticatedUser,
    initialUserLoad,
    logout,
    handleAuthDialogOpen,
    authenticatedUser
  } = useContext(AuthContext)
  useEffect(() => {
    fetchAuthenticatedUser()
  }, [fetchAuthenticatedUser])

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Yummi Pizza
            </Typography>
            {
              initialUserLoad
                ? isAuthenticated
                  ? <>
                      <IconButton>
                        <Badge
                          badgeContent={
                            authenticatedUser ? authenticatedUser.shoppingCart.length : 0
                          }
                          color="secondary"
                        >
                          <ShoppingCartIcon style={{ color: '#ffffff' }}/>
                        </Badge>
                      </IconButton>
                      <Button color="inherit" onClick={logout}>logout</Button>
                    </>
                  : <>
                      <Button color="inherit" onClick={() => handleAuthDialogOpen('login')}>Login</Button>
                      <Button color="inherit" onClick={() => handleAuthDialogOpen('register')}>Register</Button>
                    </>
                : <CircularProgress color="secondary" size={25}></CircularProgress>
            }
          </Toolbar>
        </AppBar>
      </div>
    </>
  )
}