import { storage } from 'src/firebase/config';
import { getDownloadURL, ref, uploadBytesResumable, uploadBytes } from 'firebase/storage';

export const fetchUserImage = async (
    userID: string,
    imgURI: string | undefined,
): Promise<string> => {
    const storageRef = ref(storage, `user-profile-img/${userID}/`);

    let image;
    if (!imgURI) {
        image = getDownloadURL(storageRef).then((url) => {
            return url;
        });
    } else {
        const img = await fetch(imgURI);
        const blobFile = await img.blob();
        const uploadImage = uploadBytesResumable(storageRef, blobFile);
        image = imgURI;
    }

    return image;
};
