import * as functions from 'firebase-functions';
import { PublicUserData, PrivateUserData } from 'src/types/user';
import { db } from '../config';

/**
 * Function will update the public user data from the private user data
 * Executes on write
 */
export const updatePublicUserData = functions.firestore
    .document('private-user-data/{productID}')
    .onWrite(async (change) => {
        try {
            // declare newValue to be a PrivateUserData with a required id
            const oldValue: ({ id: string } & Partial<PrivateUserData>) | undefined = {
                id: change.before.id,
                ...change.before.data(),
            };

            const newValue: ({ id: string } & Partial<PrivateUserData>) | undefined = {
                id: change.after.id,
                ...change.after.data(),
            };

            // check if the public data needs to be updated
            const publicDataUpdated =
                oldValue.id !== newValue.id ||
                oldValue.firstName !== newValue.firstName ||
                oldValue.lastName !== newValue.lastName ||
                oldValue.count !== newValue.count ||
                oldValue.image !== newValue.image;

            // if there is a new value and the values have changed, update the public user data
            /**
             * Need for exact types
             * https://github.com/Microsoft/TypeScript/issues/12936
             */
            if (newValue && publicDataUpdated) {
                // set the new public data
                const newPublicData: PublicUserData = {
                    id: newValue.id,
                    firstName: newValue.firstName || null,
                    lastName: newValue.lastName || null,
                    count: newValue.count || null,
                    image: newValue.image || null,
                };

                // set the public data
                return await db
                    .collection('public-user-data')
                    .doc(newPublicData.id)
                    .set(newPublicData);
            }
            if (!newValue && oldValue) {
                // if product was deleted, delete the public data as well
                return await db.collection('public-user-data').doc(oldValue.id).delete();
            }
            return null;
        } catch (err) {
            return Promise.reject(err);
        }
    });
