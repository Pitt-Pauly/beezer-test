import firebase from 'firebase/app';

const config = {
  apiKey: 'AIzaSyAPNF8OH_NXaFfCKxH94UVm8NoOdLu3oBg',
  authDomain: 'beezer-test-b39b7.firebaseapp.com',
  databaseURL: 'https://beezer-test-b39b7.firebaseio.com',
  projectId: 'beezer-test-b39b7',
  storageBucket: 'beezer-test-b39b7.appspot.com',
  messagingSenderId: '385558449788'
};

const app = firebase.initializeApp(config);

export default app;
