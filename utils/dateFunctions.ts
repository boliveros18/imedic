import { formatDistanceToNowStrict } from "date-fns";

export const getFormatDistanceToNow = (date: number) => {
  const fromNow = formatDistanceToNowStrict(date, { roundingMethod: "floor" });
  return fromNow;
};
