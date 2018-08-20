// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import firebase from './firebase';
import 'firebase/database';
import spinner from './Facebook-1.1s-134px.svg';
import './UserTable.css';

const Wrapper = styled.div`
  width: 90%;
  margin-top: 25px;
  margin-right: auto;
  margin-bottom: 25px;
  margin-left: auto;
`;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  padding-left: 20px;
  padding-right: 20px;
`;

const Spinner = styled.img`
  height: 2.5em;
`;

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
          apiData: snapshot.val(),
          initComplete: true
        });
      });
  }

  render() {
    const {
      apiData: { accounts, users },
      initComplete
    } = this.state;

    let content = (
      <LoadingWrapper>
        <h2> Loading user data </h2>
        <Spinner src={spinner} className="Spinner" alt="loading spinner" />
      </LoadingWrapper>
    );
    if (initComplete) {
      content = (
        <Wrapper className="UserTable">
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
                          {Object.keys(accounts[currentAccount].apps).map(
                            app => (
                              <li id={app}>
                                {accounts[currentAccount].apps[app].title}
                              </li>
                            )
                          )}
                        </ul>
                      </th>
                    </tr>
                  );
                }
                return accountDetails;
              })}
            </tbody>
          </table>
        </Wrapper>
      );
    }

    return content;
  }
}

export default UserTable;
