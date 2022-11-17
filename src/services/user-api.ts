import { deletePrivateUserData, getPrivateUserData, updatePrivateUserData } from 'src/firebase/user-api';
import { PrivateUserData } from 'src/types';
import { ConfigApi } from './config-api';

/** 
 * Check documentation resources for additional questions
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
        getUsers: build.query<null, undefined>({
            /**
             * Generating query for sending verification email
             *
             * @return {*} 
             */
            async queryFn() {
                try {
                    await verifyEmail();
                    return { data: null };
                } catch (e: any) {
                    console.log(`Error with verification email`);
                    return { error: e };
                }
            },
        }),

    overrideExisting: true,
});

export const {

} = UserApi;
