

interface CheckedArgs {
    height: number;
    weight: number;

}


const parseArguments = (args: Array<string>): CheckedArgs => {
    if (args.length > 4) throw new Error("Too many arguments");
    if (args.length < 4) throw new Error("Not enougth arguments");
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        };
    } else {
        throw new Error("Provided arguments are not numbers");
    }

};

const calculateBmi = (height: number, weight: number) => {
    const result = weight / (height * height / 10000);

    switch (true) {
        case result < 16.0: {
            return "Underweight (Severe thinness)";
            break;
        }
        case result >= 16.0 && result <=16.9: {
            return "Underweight (Moderate thinness)";
            break;
        }
        case result >=17.0 && result <=18.4: {
            return "Underweight (Mild thinness)";
            break;
        }
        case result >=18.5 && result <=24.9: {
            return "Normal (healthy weight)";
            break;
        }
        case result >=25.0 && result <=29.9: {
            return "Overweight (Pre-obese)";
            break;
        }
        case result >=30.0 && result <= 34.9: {
            return "Obese (Class I)";
                break;
            }
        case result >=35.0 && result <= 39.9: {
            return "Obese (Class II)";
            break;
        }
        case result >=40.0: {
            return "Obese (Class III)";
            break;
        }
        default:
            return "malformatted parameters";
    }

};

try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    if (error instanceof Error) {
        console.log(`Error ${error.message}`);
    }
}


export default calculateBmi;

