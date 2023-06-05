import express from 'express';
import patientService from '../services/patientService';
import { EntryWithoutId, NewPatient } from '../types';
import toNewPatient from '../../utils/toNewPatient';
import toNewEntry from '../../utils/toNewEntry';

const router = express.Router();



router.get('/', (_req, res) => {
res.status(201).send(patientService.getCleanPatients());
});

router.get('/:id', (req, res) => {
    res.status(201).send(patientService.getDistinctPatient(req.params.id))
});

router.post('/:id/entries', async (req, res) => {
    const id = req.params.id
    try {
        const entry: EntryWithoutId = toNewEntry(req.body)
        const patient = await patientService.addEntry(entry, id)
        res.status(201).send(patient)
    } catch (error) {
        if (error instanceof Error) res.status(201).send(error.message) 
    }

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