import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { FirebaseError } from 'src/firebase/handler';

/**
 * Defines the empty configuration api, will allow for code splitting the middleware across multiple files
 *
 * @resources
 * Code splitting: https://redux-toolkit.js.org/rtk-query/usage/code-splitting
 */
export const ConfigApi = createApi({
    baseQuery: fakeBaseQuery<FirebaseError>(),
    endpoints: () => ({}),
});
