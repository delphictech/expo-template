import { initializeApp } from 'firebase-admin/app';
import { firestore } from 'firebase-admin';
import * as functions from 'firebase-functions';

// export const firebaseConfig = {
//     projectId: process.env.FB_PROJECT_ID,
//     storageBucket: process.env.FB_STORAGE_BUCKET,
//     appId: process.env.FB_APP_ID,
// };
// process.env.GCLOUD_PROJECT = 'maet-pickup-dev';
initializeApp();

// I initialized the app in the test file
export const db = firestore();

export const makeDetailedData = functions.firestore
    .document('private-user-data/{productID}')
    .onWrite(async (change, context) => {

        try {
            const newValue = change.after.data();
            if (newValue) {
                // console.log(newValue.name, newValue.image, newValue.count);
                const publicData = {
                    name: newValue.name,
                    count: newValue.count,
                    image: newValue.image,
                };
                const docID = change.after.id;
                // console.log(docID);

                const publicDataRef = db.collection('public-user-data').doc(docID);
                return await publicDataRef.set(publicData);
            } else {
                return null;
            }
        } catch (err) {
            return Promise.reject(err);
        }
    });

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
