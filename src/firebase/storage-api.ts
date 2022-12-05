import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { auth, storage } from 'src/firebase/config';
import { updatePrivateUserData } from 'src/firebase/user-api';

export /**
 * Uploads file to firebase storage
 * Resource: https://stackoverflow.com/questions/72411525/firebase-storage-image-upload-function-to-return-the-image-url-after-uploading
 * @param {string} file
 * @param {string} userID
 * @return {*}  {Promise<void>}
 */
const uploadUserImage = async (uri: string): Promise<string> => {
    const userID = auth.currentUser?.uid;
    if (userID?.length) {
        const img = await fetch(uri);
        const blobFile = await img.blob();
        const storageRef = ref(storage, `user-profile-img/${userID}`);
        const uploadImage = uploadBytesResumable(storageRef, blobFile);
        // await uploadBytesResumable(storageRef, blobFile);
        // const url = await getDownloadURL(storageRef);
        // console.log(url);
        // await updatePrivateUserData({
        //     id: userID,
        //     image: url,
        // });
        // return url;
        uploadImage.on(
            'state_changed',
            () => {},
            (err) => console.warn(err),
            () => {
                return getDownloadURL(uploadImage.snapshot.ref).then(async (url) => {
                    await updatePrivateUserData({
                        id: userID,
                        image: url,
                    });
                    return url;
                });
            },
        );
    }
    return uri;
};
