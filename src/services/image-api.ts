import { ConfigApi } from './config-api';
import { fetchUserImage } from 'src/firebase/image-api';

interface imageOBJ {
    userID: string;
    imageUri?: string | undefined;
}

export const ImageApi = ConfigApi.injectEndpoints({
    endpoints: (build) => ({
        getUserImage: build.query<string, imageOBJ>({
            /**
             * Generating query for fetching and paginating users
             *
             * @return {*}
             */
            async queryFn(obj) {
                try {
                    const image = await fetchUserImage(obj.userID, obj.imageUri);
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
