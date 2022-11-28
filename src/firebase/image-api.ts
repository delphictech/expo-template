import { publicUserCollection } from 'src/firebase/config';
import { upLoadFile } from 'src/utils/upload-image';
import { getDoc, doc } from 'firebase/firestore';

export const fetchUserImage = async (
    userID: string,
    imgURI: string | undefined,
): Promise<string | null> => {
    console.log('this is from the fetch user imag function');

    // let image: string | Promise<string>;
    if (!imgURI) {
        // const docRef = doc(db, 'public-user-data', userID);
        const docRef = doc(publicUserCollection, userID);

        const docSnap = await getDoc(docRef);
        const data = docSnap.data();

        if (data?.image) {
            return data?.image;
        }
        return null;
    }
    console.log('upload function firing');
    await upLoadFile(imgURI, userID);
    return imgURI;
};
