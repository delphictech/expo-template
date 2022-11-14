import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { FirebaseError } from 'src/firebase/handler';

/*
    Code splitting: https://redux-toolkit.js.org/rtk-query/usage/code-splitting
*/

export const ConfigApi = createApi({
    baseQuery: fakeBaseQuery<FirebaseError>(),
    endpoints: () => ({}),
});
