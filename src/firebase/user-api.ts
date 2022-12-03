import {
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    limit,
    orderBy,
    OrderByDirection,
    query,
    QueryDocumentSnapshot,
    QuerySnapshot,
    setDoc,
    startAfter,
} from 'firebase/firestore';
import { privateUserCollection, publicUserCollection } from 'src/firebase/config';
import { firebaseHandler, firestoreGetHandler } from 'src/firebase/handler';
import { PrivateUserData, PublicUserData } from 'src/types';

/**
 * Function will update the user with the input fields, will overwrite if newUser set to True
 *
 * @export
 * @param {PrivateUserData} userData
 * @param {boolean} [newUser]
 * @return {*}  {Promise<void>}
 */
export async function updatePrivateUserData(
    userData: { id: string } & Partial<PrivateUserData>,
    newUser?: boolean,
): Promise<void> {
    const userRef = doc(privateUserCollection, userData.id);
    return firebaseHandler<void>(setDoc(userRef, userData, { merge: !newUser }));
}

/**
 * Function will get the private user data
 *
 * @export
 * @param {string} userID
 * @return {*}  {Promise<QueryDocumentSnapshot<PrivateUserData>>}
 */
export async function getPrivateUserData(
    userID: string,
): Promise<QueryDocumentSnapshot<PrivateUserData>> {
    const userRef = doc(privateUserCollection, userID);
    return firestoreGetHandler<PrivateUserData>(getDoc(userRef));
}

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
}

/**
 * Will fetch the users from the public user data
 *
 * @export
 * @param {(string | undefined)} [begID=undefined] - the beginning id of the last document
 * @param {number} [lim=10] - limit of documents to fetch
 * @param {OrderByDirection} [direction='desc'] - which direction to order the documents by
 * @return {*}  {Promise<QuerySnapshot<PublicUserData>>}
 */
export async function getUsers(
    begID: string | undefined = undefined,
    lim: number = 10,
    direction: OrderByDirection = 'desc',
): Promise<QuerySnapshot<PublicUserData>> {
    let q;
    const lastVisible = begID ? await getDoc(doc(publicUserCollection, begID)) : undefined;

    if (lastVisible?.exists()) {
        q = query(
            publicUserCollection,
            orderBy('count', direction),
            startAfter(lastVisible),
            limit(lim),
        );
    } else {
        q = query(publicUserCollection, orderBy('count', direction), limit(lim));
    }
    return getDocs(q);
}
