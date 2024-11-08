import axios from "axios";

const notionApi = axios.create({
    baseURL: "https://api.notion.com/v1",
    headers: {
        'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json'
    }
})

export default notionApi;
