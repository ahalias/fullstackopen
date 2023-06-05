import express from 'express';
const router = express.Router();

router.get('/', (_req, res) => {
    res.status(201).send("pong");
    });


export default router;
    