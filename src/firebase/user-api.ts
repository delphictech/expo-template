import { doc, setDoc } from "firebase/firestore";
import { privateUserCollection } from "src/firebase/config";
import { fbHandler } from "src/firebase/handler";
import { PrivateUserData } from "src/types/user";

export async function updatePrivateUserData(userData: PrivateUserData, newUser?: boolean) {
    /*
        Function will update the user with the input fields
        Will overwrite if newUser set to true
    */
    const userRef = doc(privateUserCollection, userData.id);
    return fbHandler(setDoc(userRef, userData, { merge: !newUser }));
}