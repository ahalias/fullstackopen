import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';


const app = express();
app.use(express.json());

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.get('/hello', (_req: any, res: { send: (arg0: string) => void; }) => {
    res.send('Hello Full Stack!');

});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.get('/bmi', (req: { query: { height: any; weight: any; }; }, res: { json: (arg0: { error?: string; weigth?: number; height?: number; bmi?: string; }) => void; }) => {
    const { height, weight } = req.query;

    const message: string = calculateBmi(Number(height), Number(weight));

    if (message === "malformatted parameters" || weight === "" || height === "" ) {
        res.json({
            error: "malformatted parameters"
          });

    }

    res.json({weigth: weight, height: height, bmi: message });

});

app.post('/exercises', (req, res) => {

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { target, daily_exercises } = req.body;

    if (!target || !daily_exercises) {
        res.status(400).json({
            error: "parameters missing"
          });
    } else if (isNaN(Number(target)) || daily_exercises.some((it: any) => isNaN(it))) {
        res.json({
            error: "malformatted parameters"
          });
     }
const result = calculateExercises(target, daily_exercises);
    res.json({result: result});
});


const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});