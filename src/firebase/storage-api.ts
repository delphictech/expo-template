import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage, db } from 'src/firebase/config';
import { updateDoc, doc } from 'firebase/firestore';

export /**
 * Uploads file to firebase storage
 *
 * @param {string} file
 * @param {string} userID
 * @return {*}  {Promise<void>}
 */

const upLoadFile = async (file: string, userID: string): Promise<void> => {
    if (!file) return;
    const img = await fetch(file);
    const blobFile = await img.blob();
    const storageRef = ref(storage, `user-profile-img/${userID}`);
    const uploadImage = uploadBytesResumable(storageRef, blobFile);

    const userRef = doc(db, 'private-user-data', userID);

    uploadImage.on(
        'state_changed',
        () => {},
        (err) => console.warn(err),
        () => {
            getDownloadURL(uploadImage.snapshot.ref).then(async (url) => {
                const data = {
                    image: url,
                };

                await updateDoc(userRef, data);
            });
        },
    );
};
