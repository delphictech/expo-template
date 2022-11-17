import { deleteDoc, doc, getDoc, limit, orderBy, OrderByDirection, query, QueryDocumentSnapshot, setDoc, startAfter } from "firebase/firestore";
import { privateUserCollection } from "src/firebase/config";
import { firebaseHandler, firestoreGetHandler } from "src/firebase/handler";
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
    return firebaseHandler<void>(setDoc(userRef, userData, { merge: !newUser }));
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
    return firebaseHandler<void>(deleteDoc(userRef));
};

    /*
        Function will return the data from the query type, generalizable to all supported collectionTypes
        Getting custom objects for types: https://firebase.google.com/docs/firestore/query-data/get-data#custom_objects
        begID: is the last uid of the document, will start after this
    */
export async function getUsers(begID: string | undefined = undefined, lim: number = 10, direction: OrderByDirection  = 'desc') {

    const collectionName = 'players';
    const typeRef = collection(db, collectionName);
    let q;
    const lastVisible = begID ? await getDoc(doc(db, collectionName, begID)) : undefined;
    console.log(`fethcing more data from ${collectionName}`);

    if (lastVisible?.exists()) {
        q = query(
            typeRef.withConverter(converters.players),
            orderBy(orderByStr, direction),
            startAfter(lastVisible),
            limit(lim),
        );
    } else {
        q = query(
            typeRef.withConverter(converters.players),
            orderBy(orderByStr, direction),
            limit(lim),
        );
    }
    return  getDocs(q);
}