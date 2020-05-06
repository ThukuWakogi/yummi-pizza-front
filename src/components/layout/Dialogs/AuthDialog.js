import React, { useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import Link from '@material-ui/core/Link'
import IconButton from '@material-ui/core/IconButton'
import LinearProgress from '@material-ui/core/LinearProgress'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { AuthContext } from '../../../contexts/AuthContext'

const useStyles = makeStyles(theme => {
  console.log(theme)
  return {
    link: {
      cursor: 'pointer'
    },
    errorWarning: {
      color: theme.palette.error.main
    }
  }
})

const AuthDialog = ({ authDialogOpen, handleToggle, authAction, handleDialogAction }) => {
  const classes = useStyles()
  const { login, authErrors, setErrors, loggingIn } = useContext(AuthContext)
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    showPassword: false
  })

  const handleChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const handleClickShowPassword = () => {
    setState({
      ...state,
      showPassword: !state.showPassword
    })
  }

  const handleSubmit = event => {
    event.preventDefault()

    if (authAction === 'login') {
      console.log('running action')
      login(
        state.email,
        state.password,
        [
          handleToggle,
          () => setState({
            ...state,
            email: '',
            password: ''
          })
        ]
      )
    }
  }

  return (
    <Dialog open={authDialogOpen} onClose={handleToggle}>
      <form onSubmit={handleSubmit} noValidate>
        <DialogTitle>{authAction}</DialogTitle>
        <DialogContent>
          {
            authErrors
              ? <DialogContentText className={classes.errorWarning}>
                  {authErrors.data.message}
                </DialogContentText>
              : <DialogContentText>
                  {
                    authAction === 'login'
                      ? 'Type in your email and password'
                      : 'Type in your name, email and password'
                  }
                </DialogContentText>
          }
          {
            authAction === 'login'
              ? <TextField
                  autoFocus
                  margin="dense"
                  name="email"
                  label="email"
                  type="email"
                  fullWidth
                  required
                  onChange={handleChange}
                />
              : <>
                  <TextField autoFocus margin="dense" name="name" label="name" type="email" fullWidth required/>
                  <TextField margin="dense" name="email" label="email" type="email" fullWidth />
                </>
              
          }
          <FormControl fullWidth required>
            <InputLabel htmlFor="password">password</InputLabel>
            <Input
              id="password"
              type={state.showPassword ? 'text' : 'password'}
              value={state.password}
              name="password"
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {state.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
                }
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setErrors(null, [handleToggle])} color="primary" disabled={loggingIn}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit" disabled={loggingIn}>
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
      </form>
      {
        loggingIn ? <LinearProgress /> : null
      }
    </Dialog>
  )
}
 
export default AuthDialog
