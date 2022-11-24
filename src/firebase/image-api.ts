import { storage } from 'src/firebase/config';
import { getDownloadURL, ref, uploadBytesResumable, uploadBytes } from 'firebase/storage';

export const fetchUserImage = (userID: string, imgURI: string | undefined) => {
    const storageRef = ref(storage, `user-profile-img/${userID}`);

    const image = !imgURI
        ? getDownloadURL(storageRef).then((url) => {
              return url;
          })
        : 'adsawda';

    return image;
};
