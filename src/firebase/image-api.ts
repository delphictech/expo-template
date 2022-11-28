import { storage, db } from 'src/firebase/config';
import { getDownloadURL, ref, uploadBytesResumable, uploadBytes } from 'firebase/storage';
import { upLoadFile } from 'src/utils/upload-image';
import { getDoc, doc } from 'firebase/firestore';

export const fetchUserImage = async (
    userID: string,
    imgURI: string | undefined,
): Promise<string> => {
    console.log('this is from the fetch user imag function');
    const storageRef = ref(storage, `user-profile-img/${userID}`);

    // let image: string | Promise<string>;
    if (!imgURI) {
        const docRef = doc(db, 'public-user-data', userID);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data() as string;
        // const image = await getDownloadURL(storageRef).then((url) => {
        //     return url;
        // });
        // console.log('image from undefined', image);
        // return image;
        // console.log('doc snapshot', docSnap);
        return data.image;
    }
    console.log('upload function firing');
    await upLoadFile(imgURI, userID);
    return imgURI;
};
