import * as ImagePicker from 'expo-image-picker';
import React from 'react';

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
