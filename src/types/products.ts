export interface BasicProductData {
    img: string;
    name: string;
    price: number;
    // id: string;
    lat: number;
    long: number;
    geohash: string;
}

export interface BasicProductDataID extends BasicProductData {
    id?: string;
}

type ImageMap = { [imageName: string]: string };

export interface DetailedProductData {
    id: string;
    img?: ImageMap | undefined;
    name?: string | undefined;
    price?: number | undefined;
    amenities?:
        | {
              tv: boolean;
              ac: boolean;
          }
        | undefined;
    desc?: string | undefined;
    qty?: number | undefined;
}

// export interface DistanceProducts {
//     loc: Geopoint;
//     dis: number;
// }

// export interface DistanceProducts {
//     loc: number[];
//     dis: number;
// }

export interface LastDoc {
    prod: string | undefined;
    time?: string | undefined;
}
