import React from 'react';
import { NavLink, Route, withRouter } from 'react-router-dom';
import Login from "./auth/Login"
import Register from "./auth/Register"
import UserList from './components/UserList';

import './App.css';


class App extends React.Component {
  render() {
    return (
      <>
        <header>
          <nav>
            <NavLink to="/users">Users</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </nav>
          <button onClick={this.logout}>Logout</button>
        </header>
        <main>
          <Route path="/users" component={UserList} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </main>
      </>
    );
  }

  logout = () => {
    localStorage.removeItem('jwt');

    this.props.history.push('/login');
  };
}

export default withRouter(App);
