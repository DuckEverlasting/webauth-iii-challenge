import React from 'react';
import axios from 'axios';

import '../auth/addInterceptors';
import requiresAuth from '../auth/requiresAuth';

class UserList extends React.Component {
  state = {
    users: [],
  };

  render() {
    return (
      <>
        <h2>Our Users</h2>

        <ul>
          {this.state.users.map(u => (
            <li key={u.id}>{u.username}, {u.department}</li>
          ))}
        </ul>
      </>
    );
  }

  componentDidMount() {
    const endpoint = '/users';

    axios
      .get(endpoint)
      .then(res => {
        console.log('users', res.data);
        this.setState(({ users: res.data }));
      })
      .catch(({ response }) => {
        console.error('users error', response);
      });
  }
}

export default requiresAuth(UserList);
