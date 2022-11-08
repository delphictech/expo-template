import React, { useState, useRef, useEffect } from 'react';
import { NativeBaseProvider } from 'native-base';
import { Text, FlatList, Box } from 'native-base';
import { ActivityIndicator } from 'react-native';
import { Product } from './Product';
import { LastDoc } from '../../../src/types/products';

import { useFetchProductsQuery } from '../../../src/services/product-queries';
// import { Text, View} from 'react-native';

interface prod {
    name: string;
}

interface Props {
    // inputToFlatList: prod[];
}

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

    const { data, isFetching, isLoading, isError, error, isSuccess, refetch } =
        useFetchProductsQuery(lastDocID);

    useEffect(() => {
        console.log(data);
    }, [data]);

    console.log(data);
    console.log('this is from the flatlist')

  

    return (
        <>
            {isLoading && <ActivityIndicator color="#36d7b7" />}
            {isError && <Text>Something went wrong, Error</Text>}
            {isSuccess && data && (
        <NativeBaseProvider>
            <Box w="100%" h="100%" flex={1} alignItems="center" justifyContent="center">
                <Box w="100%" flex={1} justifyContent="space-around">
                    {/* <FlatList
                    data={[inputToFlatList.text]}
                    renderItem={({ item }) => <Text>{item}</Text>}
                /> */}
                <Text>It is working!</Text>
                    <FlatList
                        // data={inputToFlatList}
                        data={data}
                        renderItem={({ item }) => <Product productData={item} />}
                    />
                </Box>
            </Box>
        </NativeBaseProvider>
        //     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        //     <Text>{inputToFlatList.text}</Text>
        //   </View>
    )}
        </>
    );


};

export default BasicFlatList;
