import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { privateUserCollection } from "src/firebase/config";
import { fbHandler, firestoreGetHandler } from "src/firebase/handler";
import { PrivateUserData } from "src/types/user";

export async function updatePrivateUserData(userData: PrivateUserData, newUser?: boolean) {
    /**
     * Function will update the user with the input fields
     * Will overwrite if newUser set to true
    */
    const userRef = doc(privateUserCollection, userData.id);
    return fbHandler<void>(setDoc(userRef, userData, { merge: !newUser }));
};

export async function getPrivateUserData(userID: string) {
    /**
     * Function will overwrite any users with the same uid
     * @param userID - string of the user id
    */
    const userRef = doc(privateUserCollection, userID);
    return firestoreGetHandler<PrivateUserData>(getDoc(userRef));
};

export async function deletePrivateUserData(userID: string) {
    /**
     * Function will delete the private user data
     * Firebase functions will automatically delete the public facing data
     */
    const userRef = doc(privateUserCollection, userID);
    return fbHandler<void>(deleteDoc(userRef));
}