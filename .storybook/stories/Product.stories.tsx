import React from 'react';
import { Product } from '../components/Products';

export default {
    title: 'Product',
    component: Product,
    args: {
        productData: {
            name: 'seth',
            img: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=600',
            price: 100,
            id: 'dadalk23e3',
            lat: 1,
            long: 2,
            geohash: 'dasasd',
        },
    },
};

const dataExample = [
    {
        name: 'seth',
        img: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=600',
        price: 100,
        id: 'dadalk23e3',
        lat: 1,
        long: 2,
        geohash: 'dasasd',
    },
    {
        name: 'seth25',
        img: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=600',
        price: 125,
        id: 'dadalk23e3vz',
        lat: 1,
        long: 2,
        geohash: 'dasasd',
    },
];

export const DefaultProduct = () => {
    return <Product productData={dataExample[0]} />;
};
