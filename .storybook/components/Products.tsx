import React, { useEffect } from 'react';

import { Flex, Image, Text, Pressable, NativeBaseProvider } from 'native-base';
// import { useNavigation } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';

import { BasicProductDataID } from '../../src/types/products';

// import { ExploreStackParams } from 'src/navigation/explore-stack';

export interface BasicProductData {
    name: string;
    img: string;
    price: number;
    id: string;
}

interface styleProp {
    padding?: string;
    height?: string;
    width?: string;
    bRadius?: number;
    backgroundColor: string;
}

interface CartItemParams {
    productData: BasicProductDataID;
    styleProp?: styleProp;
    // cartData: DetailedProductData;
}

/*
    In the future, if you need to access the product item in the "cart" or "map" screen, you will need to change this prop
    Can use the or to add other navigation props that this could be.
*/
// type ProductNavProps = StackNavigationProp<ExploreStackParams, "Product">;

export const Product: React.FC<CartItemParams> = ({
    productData,
    styleProp = {
        padding: '3',
        height: '200',
        width: '95%',
        bRadius: 40,
        backgroundColor: 'gray.300',
    },
}) => {
    // const navigation = useNavigation<ProductNavProps>();
    // console.log('SETH HERE IS THE CURRENT NAVIGATION OBJECT');
    // console.log(navigation.getState());
    // const locateProduct = (id) => {};

    // useEffect(() => {
    //     console.log(productData.id);
    // }, []);

    return (
        <NativeBaseProvider>
            <Flex
                // this is the format to make a button
                width={styleProp.width}
                // maxHeight="100%"

                backgroundColor={styleProp.backgroundColor}
                direction="row"
                alignItems="center"
                // justifyContent="center"
                p={styleProp.padding}
                m="2"
                borderRadius={styleProp.bRadius}
                height={styleProp.height}>
                <Pressable
                    // onPress={() => {
                    //     if (productData.id) {
                    //         navigation.navigate('Product', {
                    //             id: productData.id,
                    //         });
                    //     }
                    // }}
                    // onPress={() => locateProduct(props.id)}
                    flexDirection="row"
                    alignItems="center">
                    <Image
                        borderRadius={40}
                        source={{
                            uri: `${productData.img}`,
                        }}
                        alt="Alternate Text"
                        size="xl"
                    />

                    <Flex direction="row" width="60%" justifyContent="space-between">
                        <Text>{productData.name}</Text>
                        <Text>${productData.price}</Text>
                    </Flex>
                </Pressable>
            </Flex>
        </NativeBaseProvider>
    );
};
