import React, { Component, createContext } from 'react';
import axios from 'axios'

export const AuthContext = createContext(null);

class AuthContextProvider extends Component {
  state = {
    isAuthenticated: false,
    authenticatedUser: null,
    localStorageTokenKey: "ympz_token"
  }

  login = (email, password) => {
    axios
      .post('/login', { email, password })
      .then(res => {
        console.log({res})
        localStorage.setItem(this.state.localStorageTokenKey, res.data.access_token)
        this.setState({
          ...this.state,
          isAuthenticated: true
        })
      })
      .catch(err => console.log({err}))
  }

  fetchAuthenticatedUser = () => {
    axios
      .get('/udft')
      .then(res => {
        this.setState({
          ...this.state,
          authenticatedUser: res.data
        })
      })
      .catch(err => console.log({err}))
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          login: this.login,
          fetchAuthenticatedUser: this.fetchAuthenticatedUser
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
 
export default AuthContextProvider;