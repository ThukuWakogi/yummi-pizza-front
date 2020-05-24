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
import FormHelperText from '@material-ui/core/FormHelperText'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { AuthContext } from '../../../contexts/AuthContext'

const useStyles = makeStyles(theme => {
  return {
    link: {
      cursor: 'pointer',
      fontSize: '16px'
    },
    errorWarning: {
      color: theme.palette.error.main
    }
  }
})

const AuthDialog = ({ authDialogOpen, handleToggle, authAction, handleDialogAction }) => {
  const classes = useStyles()
  const { login, authErrors, setErrors, loggingIn, register, registering } = useContext(AuthContext)
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

      return
    }

    if (authAction === 'register') {
      register(
        state.name,
        state.email,
        state.password,
        [
          handleToggle,
          () => setState({
            ...state,
            name: '',
            email: '',
            password: ''
          })
        ]
      )

      return
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
                  error={
                    authErrors
                      ? authErrors.data.errors.email
                        ? true
                        : false
                      : false
                  }
                  helperText={authErrors ? authErrors.data.errors.email : null}
                  disabled={loggingIn || registering}
                />
              : <>
                  <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    label="name"
                    type="text"
                    fullWidth
                    required
                    onChange={handleChange}
                    error={
                      authErrors
                        ? authErrors.data.errors.name
                          ? true
                          : false
                        : false
                    }
                    helperText={authErrors ? authErrors.data.errors.name : null}
                    disabled={loggingIn || registering}
                    />
                  <TextField
                    margin="dense"
                    name="email"
                    label="email"
                    type="email"
                    fullWidth
                    required
                    onChange={handleChange}
                    error={
                      authErrors
                        ? authErrors.data.errors.email
                          ? true
                          : false
                        : false
                    }
                    helperText={authErrors ? authErrors.data.errors.email : null}
                    disabled={loggingIn || registering}
                  />
                </>
              
          }
          <FormControl
            fullWidth
            required
            error={
              authErrors
                ? authErrors.data.errors.password
                  ? true
                  : false
                : false
            }
            disabled={loggingIn || registering}
          >
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
            {
              authErrors
                ? <FormHelperText className={classes.errorWarning}>
                    {authErrors.data.errors.password}
                  </FormHelperText>
                : null
            }
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setErrors(null, [handleToggle])}
            color="primary"
            disabled={loggingIn || registering}
          >
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit" disabled={loggingIn || registering}>
            {authAction}
          </Button>
        </DialogActions>
        <DialogContent>
        {
          authAction === 'login'
            ? <DialogContentText>
                {`Don't have an account? `}
                <Link
                  onClick={event => handleDialogAction(event, 'register', setErrors(null))}
                  className={classes.link}
                  component="button"
                  disabled={loggingIn || registering}
                >
                  Register
                </Link>
              </DialogContentText>
            : <DialogContentText>
                {`Have an account? `}
                <Link
                  onClick={event => handleDialogAction(event, 'login', setErrors(null))}
                  className={classes.link}
                  component="button"
                  disabled={loggingIn || registering}
                >
                  Login
                </Link>
              </DialogContentText>
        }
        </DialogContent>
      </form>
      {
        loggingIn || registering ? <LinearProgress /> : null
      }
    </Dialog>
  )
}
 
export default AuthDialog
