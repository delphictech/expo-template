import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from 'src/firebase/config';
import { db } from 'src/firebase/config';
import { collection, updateDoc, doc } from 'firebase/firestore';

export const takePhoto = async (
    setImageState: React.Dispatch<React.SetStateAction<string | undefined>>,
) => {
    const pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
    });

    if (!pickerResult.cancelled) {
        // console.log(pickerResult.uri);

        // const img = await fetch(pickerResult.uri);
        // const bytes = await img.blob();

        setImageState(pickerResult.uri);
    }
};

export const pickImage = async (
    setImageState: React.Dispatch<React.SetStateAction<string | undefined>>,
) => {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
        // console.log(result.uri);
        setImageState(result.uri);
    }
};

export const upLoadFile = async (file: string, userID: string): Promise<void> => {
    if (!file) return;
    const img = await fetch(file);
    const blobFile = await img.blob();
    const storageRef = ref(storage, `user-profile-img/${userID}`);
    const uploadImage = uploadBytesResumable(storageRef, blobFile);

    const userRef = doc(db, 'private-user-data', userID);

    console.log('file from upLoadFile', file);

    uploadImage.on(
        'state_changed',
        (snapshot) => {
            const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            console.log(percent);
        },
        (err) => console.log(err),
        () => {
            getDownloadURL(uploadImage.snapshot.ref).then(async (url) => {
                console.log(url);
                const data = {
                    image: url,
                };

                await updateDoc(userRef, data);
            });
        },
    );
};
