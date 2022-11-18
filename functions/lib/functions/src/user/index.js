"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePublicUserData = void 0;
const functions = require("firebase-functions");
const config_1 = require("../config");
/**
 * Function will update the public user data from the private user data
 * Executes on write
 */
exports.updatePublicUserData = functions.firestore
    .document('private-user-data/{productID}')
    .onWrite(async (change) => {
    try {
        // declare newValue to be a PrivateUserData with a required id
        const oldValue = Object.assign({ id: change.before.id }, change.before.data());
        const newValue = Object.assign({ id: change.after.id }, change.after.data());
        // check if the public data needs to be updated
        const publicDataUpdated = oldValue.id !== newValue.id ||
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
            const newPublicData = {
                id: newValue.id,
                firstName: newValue.firstName || null,
                lastName: newValue.lastName || null,
                count: newValue.count || null,
                image: newValue.image || null,
            };
            // set the public data
            return await config_1.db
                .collection('public-user-data')
                .doc(newPublicData.id)
                .set(newPublicData);
        }
        if (!newValue && oldValue) {
            // if product was deleted, delete the public data as well
            return await config_1.db.collection('public-user-data').doc(oldValue.id).delete();
        }
        return null;
    }
    catch (err) {
        return Promise.reject(err);
    }
});
//# sourceMappingURL=index.js.map