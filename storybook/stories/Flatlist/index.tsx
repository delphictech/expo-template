import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { Text, FlatList, Box } from 'native-base';
import { Product } from './Product';
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

const BasicFlatList: React.FC<BasicProductData> = ({ inputToFlatList }) => (
    <NativeBaseProvider>
        <Box w="100%" h="100%" flex={1} alignItems="center" justifyContent="center">
            <Box w="100%" flex={1} justifyContent="space-around">
                {/* <FlatList
                    data={[inputToFlatList.text]}
                    renderItem={({ item }) => <Text>{item}</Text>}
                /> */}
                <FlatList
                    data={inputToFlatList}
                    renderItem={({ item }) => <Product productData={item} />}
                />
            </Box>
        </Box>
    </NativeBaseProvider>
    //     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //     <Text>{inputToFlatList.text}</Text>
    //   </View>
);

export default BasicFlatList;
