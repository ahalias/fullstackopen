import express from 'express';
import diagnoseService from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
    res.status(201).send(diagnoseService.getData());
});


export default router;