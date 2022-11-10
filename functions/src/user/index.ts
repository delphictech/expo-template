import { db } from 'functions/src';
import * as functions from 'firebase-functions';

export const updatePublicUserData = functions.firestore
    .document('private-user-data/{productID}')
    .onWrite(async (change) => {
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

                const publicDataRef = db.collection('public-user-data').doc(docID);
                return await publicDataRef.set(publicData);
            } else {
                return null;
            }
        } catch (err) {
            return Promise.reject(err);
        }
    });