// @flow
import React, { Component } from 'react';
import './UserTable.css';

class UserTable extends Component<{ accounts: Object, users: Object }> {
  render() {
    const { accounts, users } = this.props;
    let userRows = (
      <tr>
        <th colSpan="4">No user data available</th>
      </tr>
    );
    if (accounts && users) {
      userRows = Object.keys(users).map(id => {
        const currentAccount = users[id].account;

        let accountDetails = (
          <tr key={id}>
            <th>{id}</th>
            <th>{users[id].name}</th>
            <th colSpan="2">Account info not available</th>
          </tr>
        );
        if (
          accounts[currentAccount] !== null &&
          accounts[currentAccount] !== undefined
        ) {
          accountDetails = (
            <tr key={id}>
              <th>{id}</th>
              <th>{users[id].name}</th>
              <th>{currentAccount}</th>
              <th>
                <ul>
                  {Object.keys(accounts[currentAccount].apps).map(app => (
                    <li key={app}>
                      {accounts[currentAccount].apps[app].title}
                    </li>
                  ))}
                </ul>
              </th>
            </tr>
          );
        }
        return accountDetails;
      });
    }

    return (
      <table>
        <caption>
          <h2>User Information</h2>
        </caption>
        <thead>
          <tr>
            <th>
              <h2>User ID</h2>
            </th>
            <th>
              <h2>Name</h2>
            </th>
            <th>
              <h2>Account</h2>
            </th>
            <th>
              <h2>Apps</h2>
            </th>
          </tr>
        </thead>
        <tbody>{userRows}</tbody>
      </table>
    );
  }
}

export default UserTable;
