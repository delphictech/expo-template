import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    BasicProductData,
    BasicProductDataID,
    DetailedProductData,
    LastDoc,
} from 'src/types/products';

import { fetchDetailedData, fetchProducts } from 'src/firebase/products-api';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        fetchProducts: builder.query<BasicProductDataID[], LastDoc | undefined>({
            async queryFn(lastDocID, timeStamp) {
                // console.log(lastDocID);
                console.log('from query');

                try {
                    console.log('this is before the fetch function');
                    const prod = await fetchProducts(lastDocID?.prod);
                    console.log('products', prod);

                    return { data: prod };
                } catch (err) {
                    return { error: err };
                }
            },
            providesTags: ['Product'],
        }),

        fetchDetailedProduct: builder.query<DetailedProductData, string>({
            async queryFn(id) {
                try {
                    const detailedProductData = await fetchDetailedData(id);

                    return { data: detailedProductData };
                } catch (err) {
                    return { error: err };
                }
            },
            // providesTags: ['Product'],
        }),
    }),
});

export const { useFetchProductsQuery, useFetchDetailedProductQuery } = productsApi;
