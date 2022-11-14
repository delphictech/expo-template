import { doc, getDoc, setDoc } from "firebase/firestore";
import { privateUserCollection } from "src/firebase/config";
import { fbHandler, firestoreGetHandler } from "src/firebase/handler";
import { PrivateUserData } from "src/types/user";

export async function updatePrivateUserData(userData: PrivateUserData, newUser?: boolean) {
    /*
        Function will update the user with the input fields
        Will overwrite if newUser set to true
    */
    const userRef = doc(privateUserCollection, userData.id);
    return fbHandler<void>(setDoc(userRef, userData, { merge: !newUser }));
};

export async function getPrivateUserData(userID: string) {
    /*
        Function will overwrite any users with the same uid
    */
    const userRef = doc(privateUserCollection, userID);
    return firestoreGetHandler(getDoc(userRef));
};