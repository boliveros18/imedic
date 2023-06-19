import { formatDistanceToNowStrict } from "date-fns";

export const getFormatDistanceToNow = (date: number) => {
  const fromNow = formatDistanceToNowStrict(date, { roundingMethod: "floor" });
  return fromNow;
};

export const getSixNumbers = ( date: number) => {
  const short = date.toString().slice(0,6);
  return parseInt(short);
}