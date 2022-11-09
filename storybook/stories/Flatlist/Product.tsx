import React, { useEffect } from 'react';

import { Flex, Image, Text, Pressable } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { BasicProductDataID } from '../../../src/types/products';

// import { ExploreStackParams } from 'src/navigation/explore-stack';

export interface BasicProductData {
    name: string;
    img: string;
    price: number;
    id: string;
}

interface CartItemParams {
    productData: BasicProductDataID;
    // cartData: DetailedProductData;
}

/*
    In the future, if you need to access the product item in the "cart" or "map" screen, you will need to change this prop
    Can use the or to add other navigation props that this could be.
*/
// type ProductNavProps = StackNavigationProp<ExploreStackParams, "Product">;

export const Product: React.FC<CartItemParams> = ({ productData }) => {
    // const navigation = useNavigation<ProductNavProps>();
    // console.log('SETH HERE IS THE CURRENT NAVIGATION OBJECT');
    // console.log(navigation.getState());
    // const locateProduct = (id) => {};

    // useEffect(() => {
    //     console.log(productData.id);
    // }, []);

    return (
        <Flex
            // this is the format to make a button
            width="95%"
            // maxHeight="100%"
            borderColor="lightBlue.300"
            backgroundColor="gray.700"
            direction="row"
            alignItems="center"
            // justifyContent="center"
            p="3"
            m="2"
            height="280"
            borderRadius={40}>
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
    );
};
