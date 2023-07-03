import { formatDistanceToNowStrict } from "date-fns";

export const getFormatDistanceToNow = (date: number) => {
  const fromNow = formatDistanceToNowStrict(date, { roundingMethod: "floor" });
  return fromNow;
};

export const getFiveNumbers = ( date: number) => {
  const short = date.toString().slice(0,5);
  return parseInt(short);
}