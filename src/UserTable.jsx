// @flow
import React, { Component } from 'react';
import firebase from './firebase';
import 'firebase/database';

const CombinedTable = (props: { accounts: Object, users: Object }) => {
  const { accounts, users } = props;
  return (
    <div className="UserTable">
      <table>
        <thead>
          <tr>
            <th>user id</th>
            <th>name</th>
            <th>account</th>
            <th>apps</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(users).map(id => {
            const currentAccount = users[id].account;

            let accountDetails = (
              <tr>
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
                <tr>
                  <th>{id}</th>
                  <th>{users[id].name}</th>
                  <th>{currentAccount}</th>
                  <th>
                    <ul>
                      {Object.keys(accounts[currentAccount].apps).map(app => (
                        <li id={app}>
                          {accounts[currentAccount].apps[app].title}
                        </li>
                      ))}
                    </ul>
                  </th>
                </tr>
              );
            }
            return accountDetails;
          })}
        </tbody>
      </table>
    </div>
  );
};

/* eslint-disable no-console */
class UserTable extends Component<
  void,
  { apiData: { accounts: Object, users: Object }, initComplete: boolean }
> {
  state = {
    apiData: {
      accounts: {},
      users: {}
    },
    initComplete: false
  };

  componentWillMount() {
    firebase
      .database()
      .ref('/')
      .once('value')
      .then(snapshot => {
        this.setState({
          apiData: snapshot.val()
        });
        this.setState({ initComplete: true });
        const {
          apiData: { accounts, users }
        } = this.state;
        console.log(Object.entries(accounts));
        console.log(users);
      });
  }

  render() {
    const {
      apiData: { accounts, users },
      initComplete
    } = this.state;
    console.log(typeof users);

    let content = <h1> Loading user data </h1>;
    if (initComplete) {
      content = (
        <div className="tableWrapper">
          <CombinedTable users={users} accounts={accounts} />
        </div>
      );
    }

    return content;
  }
}
/* eslint-enable no-console */

export default UserTable;
