import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { auth, storage } from 'src/firebase/config';
import { updatePrivateUserData } from 'src/firebase/user-api';

export /**
 * Uploads file to firebase storage
 *
 * @param {string} file
 * @param {string} userID
 * @return {*}  {Promise<void>}
 */
const uploadUserImage = async (uri: string): Promise<void> => {
    const userID = auth.currentUser?.uid;
    if (userID?.length) {
        const img = await fetch(uri);
        const blobFile = await img.blob();
        const storageRef = ref(storage, `user-profile-img/${userID}`);
        const uploadImage = uploadBytesResumable(storageRef, blobFile);
        uploadImage.on(
            'state_changed',
            () => {},
            (err) => console.warn(err),
            () => {
                getDownloadURL(uploadImage.snapshot.ref).then(async (url) => {
                    await updatePrivateUserData({
                        id: userID,
                        image: url,
                    });
                });
            },
        );
    }
};
