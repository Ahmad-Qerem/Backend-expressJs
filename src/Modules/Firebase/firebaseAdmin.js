import admin from 'firebase-admin';
import {serviceAccount} from './softwareproject-d7ebf-firebase-adminsdk-r72mf-53a10fbed6.js';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://softwareproject-d7ebf-default-rtdb.firebaseio.com"
});
export {admin}

