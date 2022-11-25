import { ConfigApi } from './config-api';
import { fetchUserImage } from 'src/firebase/image-api';
import { ImageOBJ } from 'src/types/profile-image';

export const ImageApi = ConfigApi.injectEndpoints({
    endpoints: (build) => ({
        getUserImage: build.query<string, ImageOBJ>({
            /**
             * Generating query for fetching and paginating users
             *
             * @return {*}
             */
            async queryFn(obj) {
                console.log('this is from RTK');
                try {
                    const image = await fetchUserImage(obj.userID, obj.imageUri);
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
