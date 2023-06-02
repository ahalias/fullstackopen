import express from 'express';
import patientService from '../services/patientService';
import { NewPatient } from '../types';
import toNewPatient from '../../utils/toNewPatient';


const router = express.Router();



router.get('/', (_req, res) => {
res.status(201).send(patientService.getCleanPatients());
});

router.post('/', (req, res) => {
try {
    const newPatient: NewPatient = toNewPatient(req.body);
    
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);

} catch (error: unknown) {
    if (error instanceof Error) {
        console.log(error.message);
        res.status(400).send(error.message);
    }

}

});


export default router;