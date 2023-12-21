export const isValidCollection = ( collection:string, collections:string[] ) => {

    const includesCollection = collections.includes( collection );

    if( !includesCollection )
        throw new Error( `La colección '${ collection }' no es permitida, solo [${ collections}]`);

    return true;
}
