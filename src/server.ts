import express from "express";
import routes from "./routes";

import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.get('/', (req: express.Request, res: express.Response) => {
    res.send("Hello World!");
})

const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(routes)
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
