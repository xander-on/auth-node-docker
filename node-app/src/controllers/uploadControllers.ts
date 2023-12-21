import { Request, Response }  from "express";
import { getRecordValidById } from "../helpers";
import { User }               from "../models";
import { v2 as cloudinary }   from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config( {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key   : process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

//todo refactor
export const updateImageCloudinary = async( req:Request, res:Response ) => {
    const { collection, id } = req.params;
    let record;
    const mainNameFolder = 'api-usersTS';

    switch( collection ){
        case 'users':
            record  = await getRecordValidById( { model:User, id, res } );
            break;

        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto' });
    }


    if( !req.files ) return ;

    //limpiar imagenes previas
    if( record.image ){
        const imgNameArr = record.image.split('/');
        const nombreImg  = imgNameArr[ imgNameArr.length -1 ];
        const [ idImg ]  = nombreImg.split('.');
        cloudinary.uploader.destroy( `${mainNameFolder}/${collection}/${idImg}` );
    }

    const images = Array.isArray(req.files.image) ? req.files.image : [req.files.image];
    const archivo = images[0];
    const { tempFilePath } = archivo;

    const { secure_url }   = await cloudinary.uploader.upload(
        tempFilePath,
        { folder: `${mainNameFolder}/${collection}`}
    );

    record.image = secure_url;
    await record.save();

    res.json( record );
}



export const getUpdateImage = async( req:Request, res:Response ) => {
    res.json( { resp: 'okis' } );
}
