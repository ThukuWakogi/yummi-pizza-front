import React, { Component, createContext } from 'react';
import axios from 'axios'

export const AuthContext = createContext(null);

class AuthContextProvider extends Component {
  state = {
    initialUserLoad: false,
    isAuthenticated: false,
    authenticatedUser: null,
    localStorageTokenKey: "ympz_token",
    authErrors: null,
    loggingIn: false,
    registering: false
  }

  login = (email, password, callbacks) => {
    this.setState({
      ...this.state,
      loggingIn: true
    })
    axios
      .post('/login', { email, password })
      .then(res => {
        console.log({res})
        localStorage.setItem(this.state.localStorageTokenKey, res.data.access_token)
        this.setState({
          ...this.state,
          isAuthenticated: true,
          loggingIn: false
        })
        this.handleCallbacks(callbacks)
      })
      .catch(err => {
        console.log({err})
        console.log(err.response)
        this.setState({
          ...this.state,
          authErrors: err.response,
          loggingIn: false
        })
      })
  }

  fetchAuthenticatedUser = () => {
    axios
      .get(
        '/udft',
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem(this.state.localStorageTokenKey)}`
          }
        }
      )
      .then(res => {
        console.log({res})
        this.setState({
          ...this.state,
          authenticatedUser: res.data,
          isAuthenticated: true,
          initialUserLoad: true
        })
      })
      .catch(err => {
        console.log({err})
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

    this.handleCallbacks(callbacks)
  }

  handleCallbacks = (callbacks) => {
    if (Array.isArray(callbacks)) callbacks.forEach(callback => callback())
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          login: this.login,
          fetchAuthenticatedUser: this.fetchAuthenticatedUser,
          setErrors: this.setErrors,
          logout: this.logout
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
 
export default AuthContextProvider;