import notionApi from "../notionApi";
import {RecordType} from "../types/RecordType";

export const getRecordById = async(id: string) => {
    return await notionApi.get(`/pages/${id}`)
}

export const saveRecord = async(record: RecordType) => {
    const {
        company,
        content,
        language,
        description,
        campaign,
        where,
        plannedDate
    } = record;

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

    return await notionApi.post(`/pages`, payload)
}

export const changeRecord = async(id: string, data: any) => {
    return await notionApi.patch(`/pages/${id}`, data)
}

export const updateRecord = async(id: string, data: RecordType) => {
    const properties = getProperties(data)

    if(Object.entries(properties).length === 0){
        throw new Error(`'Nenhum dado a ser modificado foi informado.'`)
    }

    return await changeRecord(id, {
        properties,
    })
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
