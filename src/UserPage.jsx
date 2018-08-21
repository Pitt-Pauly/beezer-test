// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import firebase from './firebase';
import 'firebase/database';
import spinner from './Facebook-1.1s-134px.svg';
import UserTable from './UserTable';

const Wrapper = styled.div`
  width: 90%;
  margin-top: 25px;
  margin-right: auto;
  margin-bottom: 25px;
  margin-left: auto;
`;

const MessageWrapper = styled.div`
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

class UserPage extends Component<
  void,
  {
    apiData: { accounts: Object, users: Object },
    initComplete: boolean,
    error: boolean,
    errorInstance: Object
  }
> {
  state = {
    apiData: {
      accounts: {},
      users: {}
    },
    initComplete: false,
    error: false,
    errorInstance: Object
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
      })
      .catch(error => {
        this.setState({
          initComplete: false,
          error: true,
          errorInstance: error
        });
      });
  }

  render() {
    const { apiData, initComplete, error, errorInstance } = this.state;

    let content = (
      <MessageWrapper>
        <h2> Loading user data </h2>
        <Spinner src={spinner} className="Spinner" alt="loading spinner" />
      </MessageWrapper>
    );

    if (error === true) {
      content = (
        <MessageWrapper>
          <h2>
            An error occured while fetching the records. Please try again by
            refreshing this page!
          </h2>
          <p>{JSON.stringify(errorInstance)}</p>
        </MessageWrapper>
      );
      return content;
    }

    if (initComplete) {
      content = (
        <Wrapper className="UserTable">
          <UserTable {...apiData} />
        </Wrapper>
      );
    }

    return content;
  }
}

export default UserPage;
