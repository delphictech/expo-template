import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage, db } from 'src/firebase/config';
import { updateDoc, doc } from 'firebase/firestore';

export /**
 * Lauches expo image picker for camera and changes the imageState to the URI
 *
 * @param {(React.Dispatch<React.SetStateAction<string | undefined>>)} setImageState
 */

const takePhoto = async (
    setImageState: React.Dispatch<React.SetStateAction<string | undefined>>,
) => {
    const pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
    });

    if (!pickerResult.cancelled) {
        setImageState(pickerResult.uri);
    }
};

export /**
 * Lauches expo image picker for camera roll and changes the imageState to the URI
 *
 * @param {(React.Dispatch<React.SetStateAction<string | undefined>>)} setImageState
 */

const pickImage = async (
    setImageState: React.Dispatch<React.SetStateAction<string | undefined>>,
) => {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    if (!result.cancelled) {
        setImageState(result.uri);
    }
};

export /**
 * Uploads file to firebase storage
 *
 * @param {string} file
 * @param {string} userID
 * @return {*}  {Promise<void>}
 */

const upLoadFile = async (file: string, userID: string): Promise<void> => {
    if (!file) return;
    const img = await fetch(file);
    const blobFile = await img.blob();
    const storageRef = ref(storage, `user-profile-img/${userID}`);
    const uploadImage = uploadBytesResumable(storageRef, blobFile);

    const userRef = doc(db, 'private-user-data', userID);

    uploadImage.on(
        'state_changed',
        (snapshot) => {
            const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            // useful log for seeing image being uploaded
            console.log(percent);
        },
        (err) => console.warn(err),
        () => {
            getDownloadURL(uploadImage.snapshot.ref).then(async (url) => {
                const data = {
                    image: url,
                };

                await updateDoc(userRef, data);
            });
        },
    );
};
