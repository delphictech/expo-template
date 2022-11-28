import { storage, db } from 'src/firebase/config';
import { getDownloadURL, ref, uploadBytesResumable, uploadBytes } from 'firebase/storage';
import { upLoadFile } from 'src/utils/upload-image';
import { getDoc, doc } from 'firebase/firestore';
import { publicUserCollection } from 'src/firebase/config';

export const fetchUserImage = async (
    userID: string,
    imgURI: string | undefined,
): Promise<string | null> => {
    console.log('this is from the fetch user imag function');
    const storageRef = ref(storage, `user-profile-img/${userID}`);

    // let image: string | Promise<string>;
    if (!imgURI) {
        // const docRef = doc(db, 'public-user-data', userID);
        const docRef = doc(publicUserCollection, userID);

        const docSnap = await getDoc(docRef);
        const data = docSnap.data();

        if (data?.image) {
            return data?.image;
        } else {
            return null;
        }
    } else {
        console.log('upload function firing');
        await upLoadFile(imgURI, userID);
        return imgURI;
    }
};
