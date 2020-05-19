import React, { Component, createContext } from 'react';
import axios from 'axios'
import { localStorageTokenKey } from '../utils/variables'
import { handleCallbacks } from '../utils/functions'

export const AuthContext = createContext(null);

class AuthContextProvider extends Component {
  state = {
    initialUserLoad: false,
    isAuthenticated: false,
    authenticatedUser: null,
    authErrors: null,
    loggingIn: false,
    registering: false,
    authDialogOpen: false,
    authAction: null,
    postAuthAction: []
  }

  login = (email, password, callbacks) => {
    this.setState({
      ...this.state,
      loggingIn: true
    })
    axios
      .post('/login', { email, password })
      .then(res => {
        localStorage.setItem(localStorageTokenKey, res.data.access_token)
        this.setState({
          ...this.state,
          isAuthenticated: true,
          loggingIn: false,
          authenticatedUser: res.data.user
        })
        handleCallbacks([...callbacks, ...this.state.postAuthAction])
        this.setState({
          ...this.state,
          postAuthAction: []
        })
      })
      .catch(err => {
        this.setState({
          ...this.state,
          authErrors: err.response,
          loggingIn: false
        })
      })
  }

  register = (name, email, password, callbacks) => {
    this.setState({
      ...this.state,
      registering: true
    })
    axios
      .post('/register', { name, email, password })
      .then(res => {
        localStorage.setItem(localStorageTokenKey, res.data.access_token)
        this.setState({
          ...this.state,
          isAuthenticated: true,
          registering: false,
          authenticatedUser: res.data.user
        })
        handleCallbacks(callbacks)
        this.fetchAuthenticatedUser()
      })
      .catch(err => {
        this.setState({
          ...this.state,
          authErrors: err.response,
          registering: false
        })
      })
  }

  fetchAuthenticatedUser = () => {
    axios
      .get(
        '/udft',
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem(localStorageTokenKey)}`
          }
        }
      )
      .then(res => {
        this.setState({
          ...this.state,
          authenticatedUser: res.data,
          isAuthenticated: true,
          initialUserLoad: true
        })
      })
      .catch(err => {
        this.setState({
          ...this.state,
          initialUserLoad: true
        })

        if (err.response.status === 401)
          this.setState({
            ...this.state,
            authenticatedUser: null,
            isAuthenticated: false,
            initialUserLoad: true
          })
      })
  }

  logout = () => {
    localStorage.clear()
    this.setState({
      ...this.state,
      authenticatedUser: null,
      isAuthenticated: false,
      authErrors: null
    })
  }

  setErrors = (errors, callbacks) => {
    this.setState({
      ...this.state,
      authErrors: errors
    })

    handleCallbacks(callbacks)
  }

  handleAuthDialogOpen = (authAction, postAuthAction = []) => {
    this.setState({
      ...this.state,
      authDialogOpen: true,
      authAction: authAction ? authAction : this.state.authAction,
      postAuthAction: [...this.state.postAuthAction, ...postAuthAction]
    })
  }

  handleAuthDialogToggle = () => {
    this.setState({
      ...this.state,
      authDialogOpen: this.state.loggingIn || this.state.registering ? true : !this.state.authDialogOpen,
      authErrors: null
    })
  }

  handleAuthDialogAction = (event, authAction, callbacks) => {
    event.preventDefault()
    this.setState({
      ...this.state,
      authAction,
      authErrors: null
    })
    this.handleCallbacks(callbacks)
  }

  handleCallbacks = (callbacks) => {
    if (Array.isArray(callbacks)) callbacks.forEach(callback => callback())
  }

  updateOrderDetails = (pendingOrder, shoppingCart) => {
    this.setState({
      ...this.state,
      authenticatedUser: {
        ...this.state.authenticatedUser,
        pendingOrder,
        shoppingCart
      }
    })
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          login: this.login,
          fetchAuthenticatedUser: this.fetchAuthenticatedUser,
          setErrors: this.setErrors,
          logout: this.logout,
          register: this.register,
          handleAuthDialogOpen: this.handleAuthDialogOpen,
          handleAuthDialogToggle: this.handleAuthDialogToggle,
          handleAuthDialogAction: this.handleAuthDialogAction,
          updateOrderDetails: this.updateOrderDetails
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
 
export default AuthContextProvider;
