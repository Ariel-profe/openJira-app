import type { NextApiRequest, NextApiResponse } from 'next';

import { Entry, IEntry } from '../../../../models';
import { db } from '../../../../database';


type Data = 
   | {msg: string}
   | IEntry;



export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    // const {id} = req.query;

    // if(!mongoose.isValidObjectId(id)){
    //     return res.status(400).json({msg: `El id ${id} no es válido`});
    // }
    
    switch (req.method) {
        
        case 'GET':
            return getEntry(req, res);
        
        case 'PUT':
            return updateEntry(req, res);
            
        default:
            return res.status(400).json({msg: 'El método no existe'});
        
    };


};

const getEntry = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const {id} = req.query;

    await db.connect();
    
    const getEntry = await Entry.findById(id);
    
    try {
    
        if(!getEntry){
            await db.disconnect();
            return res.status(400).json({msg: `La entrada con id ${id} no existe en base de datos`});
        };
        res.status(200).json(getEntry);
        db.disconnect();
    } catch (error: any) {
        console.log(error);
        db.disconnect();
        res.status(400).json({msg: error.errors.status.message});
    }

};

const updateEntry = async(req: NextApiRequest, res:NextApiResponse<Data>) => {

    const {id} = req.query;

    await db.connect();
    
    const entryToUpdate = await Entry.findById(id);
    
    if(!entryToUpdate){
        await db.disconnect();
        return res.status(400).json({msg: `No hay entrada con el id ${id}`});
    };

    const {
            description = entryToUpdate.description, 
            status = entryToUpdate.status
        } = req.body;

        try {
            const updatedEntry = await Entry.findByIdAndUpdate(id, {description, status}, {runValidators: true, new: true} );
            await db.disconnect();
            res.status(200).json(updatedEntry!)
        } catch (error: any) {
            console.log(error);
            await db.disconnect();
            res.status(400).json({msg: error.errors.status.message})
        }



};