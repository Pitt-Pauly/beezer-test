// @flow

export type User = {
  [id: string]: {
    account: string,
    name: string
  }
};

export type Account = {
  apps: App
};

export type App = {
  [id: string]: { title: string }
};
