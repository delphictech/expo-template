import { getUsers, fetchUserImage, updatePrivateUserData } from 'src/firebase/user-api';
import { PrivateUserData, PublicUserData } from 'src/types';
import { ImageOBJ } from 'src/types/profile-image';
import { resetEmail } from 'src/firebase/auth-api';
import { ConfigApi } from './config-api';

/**
 * Users api for fetching data related to users
 *
 * @resources
 * Customizing RTK Query with following resources
 * Firebase api calls with RTK-Query: https://stackoverflow.com/questions/71587312/is-it-possible-to-use-firebase-query-with-redux-toolkit-or-rtk-query-in-react)
 * Using queryfn: https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#implementing-a-queryfn
 * Using fakeBaseQuery: https://redux-toolkit.js.org/rtk-query/usage-with-typescript#typing-a-queryfn
 * Code Splitting: https://redux-toolkit.js.org/rtk-query/usage/code-splitting
 *
 */
export const UserApi = ConfigApi.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query<Array<PublicUserData>, string | undefined>({
            /**
             * Generating query for fetching and paginating users
             *
             * @return {*}
             */
            async queryFn(begID) {
                try {
                    const querySnapshot = await getUsers(begID, 3, 'desc');
                    const users = querySnapshot.docs.map((userDoc) => userDoc.data());
                    return { data: users };
                } catch (e: any) {
                    console.warn(`Error with fetching users`);
                    return { error: e };
                }
            },
        }),
        getUserImage: build.query<string | null, ImageOBJ>({
            /**
             * Fetches the usser image either from firestore or uploads new image from state change.
             *
             * @param {*} obj - takes in an object with with userID(required) and iamgeUri(optional --upload only)
             * @return {*} - returns a string or null
             */
            async queryFn(obj) {
                try {
                    const image = await fetchUserImage(obj.userID, obj.imageUri);
                    // set into firebase object
                    console.warn('image data being sent back', image);
                    return { data: image };
                } catch (e: any) {
                    console.warn(`Error with fetching users`);
                    return { error: e };
                }
            },
        }),
        updateUserField: build.mutation<PrivateUserData, PrivateUserData>({
            async queryFn(userFields) {
                // const newUser = initializeUser(user);
                try {
                    // get existing user doc
                    await updatePrivateUserData(userFields);

                    return { data: userFields };
                } catch (e: any) {
                    console.log(`Error with updating player: ${e}`);
                    console.log(e);
                    return { error: e };
                }
            },
        }),
        // new password query
    }),
    overrideExisting: true,
});

export const { useGetUsersQuery, useGetUserImageQuery, useUpdateUserFieldMutation } = UserApi;
