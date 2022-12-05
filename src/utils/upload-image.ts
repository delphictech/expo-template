import * as ImagePicker from 'expo-image-picker';

export /**
 * Lauches expo image picker for camera and changes the imageState to the URI
 *
 * @return {*}  {(Promise<string | null>)}
 */
const takePhoto = async (): Promise<string | undefined> => {
    const pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
    });

    if (!pickerResult.cancelled) {
        return pickerResult.uri;
    }
    return undefined;
};

export /**
 * Lauches expo image picker for camera roll and returns the image uri or a null value
 *
 * @return {*}  {(Promise<string | null>)}
 */
const pickImage = async (): Promise<string | undefined> => {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    if (!result.cancelled) {
        return result.uri;
    }
    return undefined;
};
