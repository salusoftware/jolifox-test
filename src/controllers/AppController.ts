import { Request, Response } from "express";
import {RecordType} from "../types/RecordType";
import * as AppService from "../services/AppService";

export const getRecordById = async(req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const response = await AppService.getRecordById(id);
        res.status(201).json(response.data);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar registro' });
    }
}
export const saveRecord = async(req: Request, res: Response) => {
    try{
        const data = req.body;
        const response = await AppService.saveRecord(data);
        res.status(201).json(response.data);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar registro' });
    }
}
export const deleteRecord = async(req: Request, res: Response) => {
    try{
        const { id} = req.params;
        const response = await AppService.changeRecord(id, {
            archived: true,
        })
        res.status(201).json(response.data);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Houve um erro durante a tentativa de exclusão do registro' });
    }
}
export const updateRecord = async(req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const data: RecordType = req.body;
        const response = await AppService.updateRecord(id, data);
        res.status(201).json(response.data);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Houve um erro durante a tentativa de modificação do registro' });
    }
}
export const restoreRecord = async(req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const response = await AppService.changeRecord(id, {
            archived: false
        });
        res.status(201).json(response.data);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Houve um erro durante a tentativa de restauração do registro' });
    }
}
