import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles(theme => ({
  link: {
    cursor: 'pointer'
  }
}))

const AuthDialog = ({ authDialogOpen, handleToggle, authAction, handleDialogAction }) => {
  const classes = useStyles()

  return (
    <Dialog open={authDialogOpen} onClose={handleToggle}>
      <DialogTitle>{authAction}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {
            authAction === 'login'
              ? 'Type in your email and password'
              : 'Type in your name, email and password'
          }
        </DialogContentText>
        {
          authAction === 'login'
            ? <TextField autoFocus margin="dense" name="email" label="email" type="email" fullWidth />
            : <>
                <TextField autoFocus margin="dense" name="name" label="name" type="email" fullWidth />
                <TextField margin="dense" name="email" label="email" type="email" fullWidth />
              </>
            
        }
        <TextField margin="dense" name="password" label="password" type="password" fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleToggle} color="primary">
          Cancel
        </Button>
        <Button variant="contained" color="primary">
          {authAction}
        </Button>
      </DialogActions>
      <DialogContent>
      {
        authAction === 'login'
          ? <DialogContentText>
              {`Don't have an account? `}
              <Link
                onClick={event => handleDialogAction(event, 'register')}
                className={classes.link}
              >
                Register
              </Link>
            </DialogContentText>
          : <DialogContentText>
              {`Have an account? `}
              <Link
                onClick={event => handleDialogAction(event, 'login')}
                className={classes.link}
              >
                Login
              </Link>
            </DialogContentText>
      }
      </DialogContent>
    </Dialog>
  )
}
 
export default AuthDialog
