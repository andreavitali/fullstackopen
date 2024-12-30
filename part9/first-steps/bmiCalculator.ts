interface BmiValues {
  heightInCm: number;
  weightInKg: number;
}

const parseBmiArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      heightInCm: Number(args[2]),
      weightInKg: Number(args[3])
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateBmi = (h: number, w: number): string => {
  const bmi = w / Math.pow(h / 100, 2);

  if (bmi < 15) {
    return "Very severely underweight";
  } else if (bmi > 15 && bmi < 16) {
    return "Severely underweight";
  } else if (bmi > 16 && bmi < 18.5) {
    return "Underweight";
  } else if (bmi > 18.5 && bmi < 25) {
    return "Normal (healthy weight)";
  } else if (bmi > 25 && bmi < 30) {
    return "Overweight";
  } else if (bmi > 30 && bmi < 35) {
    return "Obese Class I (Moderately obese)";
  } else if (bmi > 35 && bmi < 40) {
    return "Obese Class II (Severely obese)";
  } else {
    return "Obese Class III (Very severely obese)";
  }
};

if (require.main === module) {
  const { heightInCm, weightInKg } = parseBmiArguments(process.argv);
  console.log(calculateBmi(heightInCm, weightInKg));
}
