import { deleteDoc, doc, getDoc, QueryDocumentSnapshot, setDoc } from "firebase/firestore";
import { privateUserCollection } from "src/firebase/config";
import { fbHandler, firestoreGetHandler } from "src/firebase/handler";
import { PrivateUserData } from "src/types";

/**
 * Function will update the user with the input fields, will overwrite if newUser set to True
 *
 * @export
 * @param {PrivateUserData} userData
 * @param {boolean} [newUser]
 * @return {*}  {Promise<void>}
 */
export async function updatePrivateUserData(userData: PrivateUserData, newUser?: boolean): Promise<void> {

    const userRef = doc(privateUserCollection, userData.id);
    return fbHandler<void>(setDoc(userRef, userData, { merge: !newUser }));
};


/**
 * Function will get the private user data
 *
 * @export
 * @param {string} userID
 * @return {*}  {Promise<QueryDocumentSnapshot<PrivateUserData>>}
 */
export async function getPrivateUserData(userID: string): Promise<QueryDocumentSnapshot<PrivateUserData>> {
    
    const userRef = doc(privateUserCollection, userID);
    return firestoreGetHandler<PrivateUserData>(getDoc(userRef));
};

/**
 * Function will delete the private user data
 * 
 * @remarks
 * Firebase functions will automatically delete the public facing data
 * 
 * @export
 * @param {string} userID
 * @return {*}  {Promise<void>}
 */
export async function deletePrivateUserData(userID: string): Promise<void> {

    const userRef = doc(privateUserCollection, userID);
    return fbHandler<void>(deleteDoc(userRef));
};