import { NewDiaryEntry, Visibility, Weather } from "./types";
import { z } from "zod";

// const isString = (text: unknown): text is string => {
//   return typeof text === "string" || text instanceof String;
// };

// const isDate = (text: string): text is string => {
//   return Boolean(Date.parse(text));
// };

// const isWeather = (text: string): text is Weather => {
//   return (Object.values(Weather) as string[]).includes(text);
// };

// const isVisibility = (text: string): text is Visibility => {
//   return (Object.values(Visibility) as string[]).includes(text);
// };

// const parseComment = (comment: unknown): string => {
//   if (!isString(comment)) {
//     throw new Error("Incorrect or missing comment");
//   }

//   return comment;
// };

// const parseDate = (date: unknown): string => {
//   if (!isString(date) || !isDate(date)) {
//     throw new Error("Incorrect or missing date " + date);
//   }

//   return date;
// };

// const parseWeather = (weather: unknown): Weather => {
//   if (!isString(weather) || !isWeather(weather)) {
//     throw new Error("Incorrect or missing weather " + weather);
//   }
//   return weather as Weather;
// };

// const parseVisibility = (visibility: unknown): Visibility => {
//   if (!isString(visibility) || !isVisibility(visibility)) {
//     throw new Error("Incorrect or missing visibility " + visibility);
//   }
//   return visibility as Visibility;
// };

export const NewEntrySchema = z.object({
  weather: z.nativeEnum(Weather),
  visibility: z.nativeEnum(Visibility),
  date: z.string().date(),
  comment: z.string().optional()
});

const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  return NewEntrySchema.parse(object);

  // if (!object || typeof object !== "object") {
  //   throw new Error("Incorrect or missing data");
  // }

  // if ("comment" in object && "date" in object && "weather" in object && "visibility" in object) {
  //   const newEntry: NewDiaryEntry = {
  //     weather: parseWeather(object.weather),
  //     visibility: parseVisibility(object.visibility),
  //     date: parseDate(object.date),
  //     comment: parseComment(object.comment)
  //   };

  //   return newEntry;
  // }

  // throw new Error("Incorrect data: some fields are missing");
};

export default toNewDiaryEntry;
