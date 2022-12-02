import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from 'src/firebase/config';
import { updatePrivateUserData } from 'src/firebase/user-api';

export /**
 * Uploads file to firebase storage
 *
 * @param {string} file
 * @param {string} userID
 * @return {*}  {Promise<void>}
 */
const uploadUserImage = async (file: string, userID: string): Promise<void> => {
    if (!file) return;
    const img = await fetch(file);
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
};
