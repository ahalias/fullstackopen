


interface Result { 
    target: number;
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    average: number;
 }

 interface checkedArgs {
    target: number;
    arr: Array<number>;
 }


  const parseArguments = (args: Array<string>): checkedArgs => {
    
    args.slice(2).forEach ((it) => { 
        if (isNaN(Number(it)) && it !== " ")
         { 
            throw new Error("Provided arguments are not numbers");
        }
    });

    const [ target, ...arr ] = args.slice(2).map(Number);


    return {
        target, arr
    };
 };




const calculateExercises = (target: number, arr: Array<number>): Result => {



    const periodLength = arr.length;
    const trainingDays = arr.filter(it => it !== 0).length;
    const average = arr.reduce((acc, value) => acc + value) / periodLength;
    const success = average >= target ? true : false;
    const rating = (average / target) >= 1.1 ? 3 : (average / target) >= 0.8 && (average / target) < 1.1 ? 2 : 1;
    const ratingDescription = rating === 3 ? "Great, you're muscle monster" : rating === 2 ? "OK, could be better" : "Laaaaaame, go to gym right now";



    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
    
};


try {
    const {target, arr} = parseArguments(process.argv);
    console.log(calculateExercises(target, arr));
} catch (error) {
    if (error instanceof Error) {
        console.log(`Error ${error.message}`);
    }
}


export default calculateExercises;