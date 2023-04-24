// Import the functions you need from the SDKs you need
//import { initializeApp } from 'firebase/app';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDzlSKM_KcjSEBwM65uBQrG9001ys20nw8',
  authDomain: 'shopping-283b3.firebaseapp.com',
  databaseURL:
    'https://shopping-283b3-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'shopping-283b3',
  storageBucket: 'shopping-283b3.appspot.com',
  messagingSenderId: '892997070108',
  appId: '1:892997070108:web:5049ddf595d5082cc09ed9',
};

import {
  getDatabase,
  ref,
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const entriesInDB = ref(database, 'entries');
