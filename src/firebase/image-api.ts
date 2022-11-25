import { storage } from 'src/firebase/config';
import { getDownloadURL, ref, uploadBytesResumable, uploadBytes } from 'firebase/storage';

export const fetchUserImage = async (
    userID: string,
    imgURI: string | undefined,
): Promise<string> => {
    console.log('this is from the fetch user imag function');
    const storageRef = ref(storage, `user-profile-img/${userID}`);

    // let image: string | Promise<string>;
    if (imgURI === undefined) {
        const image = await getDownloadURL(storageRef).then((url) => {
            return url;
        });
        console.log('image from undefined', image);
        return image;
    } else {
        const img = await fetch(imgURI);
        const blobFile = await img.blob();
        const uploadImage = uploadBytesResumable(storageRef, blobFile);
        uploadImage.on(
            'state_changed',
            (snapshot) => {
                const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                console.log(percent);
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadImage.snapshot.ref).then((url) => console.log(url));
            },
        );
        console.log('image from defined', imgURI);
        return imgURI;
    }
};
