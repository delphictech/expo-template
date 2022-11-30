import React from 'react';
import * as ImagePicker from 'expo-image-picker';

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
