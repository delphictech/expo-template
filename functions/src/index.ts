import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// admin.initializeApp();
// I initialized the app in the test file
const db = admin.firestore();

export const makeDetailedData = functions.firestore
    .document('private-user-data/{productID}')
    .onWrite(async (change, context) => {
        try {
            console.log('hello');
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
