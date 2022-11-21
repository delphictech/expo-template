import {
    collection,
    getDocs,
    doc,
    getDoc,
    query,
    limit,
    orderBy,
    startAfter,
} from 'firebase/firestore';

import { db } from 'src/firebase/firebase-config';
import { BasicProductData, BasicProductDataID, DetailedProductData } from 'src/types/products';
import { converters } from './db-converters';

export const fetchProducts = async (lastDocumentID: string | undefined) => {
    const colRef = collection(db, 'basic-product-data').withConverter<BasicProductData>(
        converters.productData,
    );
    console.log('hellllllo');

    const lastVisible = lastDocumentID ? await getDoc(doc(colRef, lastDocumentID)) : null;

    // Make sure to change limit back to 3
    const q = lastVisible
        ? query(colRef, orderBy('price'), startAfter(lastVisible), limit(3))
        : query(colRef, orderBy('price'), limit(3));

    // const q = query(colRef);

    console.log(q);
    console.log(q);

    // Make sure to change limit back to 3
    const productData = await getDocs(q);

    console.log(productData);

    const prod: BasicProductDataID[] = [];

    productData.docs.forEach((document) => {
        const datas = { ...document.data(), id: document.id };
        prod.push(datas);
    });

    return prod;
};

export const fetchDetailedData = async (id: string) => {
    const docRef = doc(db, 'detailed-product-data', id).withConverter<DetailedProductData>(
        converters.detailedProductData,
    );
    const docSnap = await getDoc(docRef);
    const detailedProductData = { ...docSnap.data(), id };

    return detailedProductData;
};

// export const fetchStripeProducts = async () => {
//     const pricesCollecitonRef = collectionGroup(db, 'prices').withConverter<StripeProductDetailed>(
//         converters.stripeProductsDetailed,
//     );

//     // const pricesCollecitonRef = collectionGroup(db, 'prices');
//     const productsQuery = query(pricesCollecitonRef, where('active', '==', true));
//     const productsQuerySnap = await getDocs(productsQuery);

//     // const thing = await getDoc(productsRef);

//     /// snapshot that contains all of the prices, that are active

//     const products: StripeProducts[] = [];

//     await Promise.all(
//         productsQuerySnap.docs.map(async (document) => {
//             const priceData = document.data();
//             const productsRef = doc(
//                 db,
//                 'products',
//                 priceData.product,
//             ).withConverter<StripeProductBasic>(converters.stripeProductsBasic);
//             const basicProductRef = await getDoc(productsRef);
//             const basicProductInfo = basicProductRef.data();
//             const data = {
//                 priceID: document.id,
//                 ...document.data(),
//                 ...basicProductInfo,
//             };

//             products.push(data);
//         }),
//     );

//     return products;
// };
