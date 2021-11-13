import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// firebase.initializeApp({
//   apiKey: "AIzaSyB6TAKlOSd6eIEFbUVG9bvcH0rZknkx4xA",
//   authDomain: "coastagram-app.firebaseapp.com",
//   projectId: "coastagram-app",
//   storageBucket: "coastagram-app.appspot.com",
//   messagingSenderId: "371095148906",
//   appId: "1:371095148906:web:da22c00c2ea850e229ad13"
// });

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
