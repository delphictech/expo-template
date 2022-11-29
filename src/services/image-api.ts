import { fetchUserImage } from 'src/firebase/user-api';
import { ImageOBJ } from 'src/types/profile-image';
import { ConfigApi } from './config-api';

export const ImageApi = ConfigApi.injectEndpoints({
    endpoints: (build) => ({
        getUserImage: build.query<string | null, ImageOBJ>({
            /**
             * Fetches the usser image either from firestore or uploads new image from state change.
             *
             * @param {*} obj - takes in an object with with userID(required) and iamgeUri(optional --upload only)
             * @return {*} - returns a string or null
             */
            async queryFn(obj) {
                console.log('this is from RTK');
                try {
                    const image = await fetchUserImage(obj.userID, obj.imageUri);
                    // set into firebase object
                    console.log('image data being sent back', image);
                    return { data: image };
                } catch (e: any) {
                    console.warn(`Error with fetching users`);
                    return { error: e };
                }
            },
        }),
    }),
    overrideExisting: true,
});

export const { useGetUserImageQuery } = ImageApi;
