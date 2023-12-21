import { DataUrls } from "../interfaces/DataUrls";

export const nextPrevUrlGenerator = ( dataUrls:DataUrls ) => {
    const { limit, from, total } = dataUrls;
    const fromNext = from + limit;
    const fromPrev = from - limit;

    const next = fromNext <= total
        ? nextPrevBuilderUrl( {...dataUrls, from : fromNext} )
        : null;

    const prev = fromPrev > 0
        ? nextPrevBuilderUrl( {...dataUrls, from : fromPrev} )
        : null;

    return { next, prev }
}



const nextPrevBuilderUrl = ( dataUrls:DataUrls ) => {
    const { limit, from, collection } = dataUrls;
    const  domain:string  = process.env.DOMAIN || '';
    const  urlBase:string = process.env.URL_BASE || '';
    const  port:string    = process.env.APP_PORT || '3000';
    const  urlAPI:string  = `${domain}:${port}${urlBase}`;

    return `${urlAPI}/${collection}?limit=${limit}&from=${from}`
}

