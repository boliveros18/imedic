import { db } from ".";
import { Calendar, ICalendar } from "../models";

export const getCalendarByMedicId = async (
  medic_id: string
): Promise<ICalendar[]> => {
  const params = medic_id ? { medic_id: medic_id } : {};
  await db.connect();
  const calendar: ICalendar[] = await Calendar.find(params).sort({
    createdAt: "ascending",
  });
  await db.disconnect();
  if(calendar[0]){
    return JSON.parse(JSON.stringify(calendar[0]));
  }
  return JSON.parse(JSON.stringify(calendar));
};
