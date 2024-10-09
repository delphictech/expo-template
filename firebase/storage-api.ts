import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '~/firebase/config';

export /**
 * Uploads file to firebase storage
 * Resource: https://stackoverflow.com/questions/72411525/firebase-storage-image-upload-function-to-return-the-image-url-after-uploading
 * @param {string} file
 * @param {string} userID
 * @return {*}  {Promise<void>}
 */
const uploadImage = async (
    uri: string,
    id: string,
    type: 'user' | 'competition' | 'team',
): Promise<string> => {
    // define the path in storage
    const trimmedUri = uri.match(/([^/]+$)/);
    const newTrimmedUri = trimmedUri !== null ? trimmedUri[0] : undefined;

    // get the image data
    const img = await fetch(uri);
    const blobFile = await img.blob();
    // const path = `${type}/${id}/${newTrimmedUri}`;
    const path = `${type}/${id}`;

    const storageRef = ref(storage, path);

    // adding custom meta data
    const metaData = newTrimmedUri
        ? {
              customMetadata: {
                  blurred: 'false',
              },
          }
        : undefined;

    // upload image and get url
    const imageBytes = await uploadBytesResumable(storageRef, blobFile, metaData);
    const url = await getDownloadURL(imageBytes.ref);
    return url;
};
