import React, { useState, useRef, useEffect } from 'react';
import { Text, FlatList, Box } from 'native-base';
import { ActivityIndicator } from 'react-native';
import { Product } from './Product';
import { LastDoc } from '../../../src/types/products';
import { fetchProducts } from '../../../src/firebase//products-api';
import { BasicProductDataID } from '../../../src/types/products';

// import { useFetchProductsQuery } from '../../../src/services/product-queries';
// import { Text, View} from 'react-native';

export interface BasicProductData {
    inputToFlatList: {
        img: string;
        name: string;
        price: number;
        id: string;
    }[];
}

const BasicFlatList: React.FC<BasicProductData> = ({ inputToFlatList }) => {
    const timeStampRef = useRef(String(Date.now())).current;
    const [lastDocID, setLastDocID] = useState<LastDoc>({
        prod: undefined,
        time: timeStampRef,
    });
    const [prod, setProd] = useState<BasicProductDataID[]>([
        {
            name: 'seth',
            img: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=600',
            price: 100,
            id: 'dadalk23e3',
            lat:1,
            long:2,
            geohash:'dasasd',
        },
        {
            name: 'seth25',
            img: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=600',
            price: 125,
            id: 'dadalk23e3vz',
            lat:1,
            long:2,
            geohash:'dasasd',
        },
    ]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const prod = await fetchProducts(undefined);
        setProd(prod);
        console.log('this is from prods')
        console.log(prod);
    };

    // const { data, isFetching, isLoading, isError, error, isSuccess, refetch } =
    //     useFetchProductsQuery(lastDocID);

    // useEffect(() => {
    //     console.log(data);
    // }, [data]);

    // console.log('data', data);
    // console.log('error', error);
    console.log('this is from the flatlist');

    return (
        <>
            {/* {isLoading && <ActivityIndicator color="#36d7b7" />} */}
            {/* {isError && <Text>Something went wrong, Error</Text>} */}
            {/* {isSuccess && data && ( */}
            <Box w="100%" h="100%" flex={1} alignItems="center" justifyContent="center">
                <Box w="100%" flex={1} justifyContent="space-around">
                    {/* <FlatList
                    data={[inputToFlatList.text]}
                    renderItem={({ item }) => <Text>{item}</Text>}
                /> */}
                    <Text>It is working!</Text>
                    <FlatList
                        // data={inputToFlatList}
                        data={prod}
                        renderItem={({ item }) => <Product productData={item} />}
                    />
                </Box>
            </Box>

            {/* )} */}
        </>
    );
};

export default BasicFlatList;
