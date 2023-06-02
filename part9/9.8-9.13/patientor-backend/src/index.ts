import express from 'express';
import cors from 'cors';
import pingRouter from './routes/ping';
import diagnoseRouter from './routes/diagnoses';
import patientRouter from './routes/patients';
const app = express();
app.use(express.json());




// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());



app.use('/api/ping', pingRouter);
app.use('/api/diagnoses', diagnoseRouter);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
app.use('/api/patients', patientRouter);


const PORT = 3001;

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.listen(PORT), () => {
    console.log(`Server running on port ${PORT}`);
};