import { Router, Request, Response } from 'express';
import * as AppController from "./controllers/AppController";

const router = Router();

router.get('/api/jolifox/:id', AppController.getRecordById)
router.post('/api/jolifox', AppController.saveRecord)
router.delete('/api/jolifox/:id', AppController.deleteRecord)
router.put('/api/jolifox/:id', AppController.updateRecord)
router.post('/api/jolifox/restore/:id', AppController.restoreRecord)

export default router;
