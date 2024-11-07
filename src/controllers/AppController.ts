import { Request, Response } from "express";
import notionApi from "../notionApi";
import {RecordType} from "../types/RecordType";

export const getRecordById = async(req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const response = await notionApi.get(`/pages/${id}`)
        res.status(201).json(response.data);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar registro' });
    }
}
export const saveRecord = async(req: Request, res: Response) => {
    try{
        const {
            company,
            content,
            language,
            description,
            campaign,
            where,
            plannedDate
        } = req.body;

        const payload = {
            parent: { database_id: process.env.NOTION_DATABASE_ID },
            properties: {
                Company: { "title": [{ "text": { "content": company } }] },
                Content: { "rich_text": [{ "text": { "content": content } }] },
                Language: { "select": { "name": language } },
                Description: { "rich_text": [{ "text": { "content": description} }] },
                Campaign: { "rich_text": [{ "text": { "content": campaign } }] },
                Where: { "rich_text": [{ "text": { "content": where } }] },
                PlannedDate: { "date": { "start": plannedDate } }
            }
        }

        const response = await notionApi.post(`/pages`, payload)
        res.status(201).json(response.data);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar registro' });
    }
}
export const deleteRecord = async(req: Request, res: Response) => {
    try{
        const { id} = req.params;
        const response = await notionApi.patch(`/pages/${id}`, {
            archived: true
        })
        res.status(201).json(response.data);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Houve um erro durante a tentativa de exclusão do registro' });
    }
}
const getProperties = (data: RecordType) => {
    let dataToUpdate: any = {}
    if(data?.company){
        dataToUpdate = {
            ...dataToUpdate,
            Company: { "title": [{ "text": { "content": data?.company } }] },
        }
    }

    if(data?.content){
        dataToUpdate = {
            ...dataToUpdate,
            Content: { "rich_text": [{ "text": { "content": data.content } }] },
        }
    }

    if(data?.language){
        dataToUpdate = {
            ...dataToUpdate,
            Language: { "select": { "name": data.language } },
        }
    }

    if(data?.description){
        dataToUpdate = {
            ...dataToUpdate,
            Description: { "rich_text": [{ "text": { "content": data.description} }] },
        }
    }

    if(data?.campaign){
        dataToUpdate = {
            ...dataToUpdate,
            Campaign: { "rich_text": [{ "text": { "content": data.campaign } }] },
        }
    }

    if(data?.where){
        dataToUpdate = {
            ...dataToUpdate,
            Where: { "rich_text": [{ "text": { "content": data.where } }] },
        }
    }

    if(data?.plannedDate){
        dataToUpdate = {
            ...dataToUpdate,
            PlannedDate: { "date": { "start": data.plannedDate } }
        }
    }

    return dataToUpdate;
}
export const updateRecord = async(req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const data: RecordType = req.body;
        const properties = getProperties(data);

        if(Object.entries(properties).length > 0){
            const payload = {
                properties
            }
            const response = await notionApi.patch(`/pages/${id}`, payload)
            res.status(201).json(response.data);
        }else{
            res.status(201).json('Nenhum dado a ser modificado foi informado.');
        }
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar registro' });
    }
}
