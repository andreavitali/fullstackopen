interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  target: number;
  dailyExerciseHours: number[];
}

const parseExerciseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 12) throw new Error("Too many arguments");
  const target = Number(args[2]);
  const hours = args.slice(3).map(h => Number(h));

  if (!isNaN(target) && !hours.some(isNaN)) {
    return {
      target: target,
      dailyExerciseHours: hours
    };
  } else {
    throw new Error("Provided values were not correct!");
  }
};

export const calculateExercises = (dailyExerciseHours: number[], targetAmount: number): Result => {
  const trainingDays = dailyExerciseHours.filter(h => h > 0).length;
  const average = dailyExerciseHours.reduce((a, b) => a + b) / dailyExerciseHours.length;
  const success = average >= targetAmount ? true : false;

  let rating;
  let ratingDescription;

  if (average < targetAmount) {
    rating = 1;
    ratingDescription = "not too bad but could be better";
  } else if (average === targetAmount) {
    rating = 2;
    ratingDescription = "good";
  } else {
    rating = 3;
    ratingDescription = "very good";
  }

  return {
    periodLength: dailyExerciseHours.length,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: targetAmount,
    average: average
  };
};

if (require.main === module) {
  const { target, dailyExerciseHours } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(dailyExerciseHours, target));
}
