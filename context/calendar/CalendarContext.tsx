import { createContext } from "react";
import { Calendar } from "../../interfaces";

interface ContextProps {
  calendar: Calendar;
  getCalendarByMedicId: (medic_id: string) => Promise<void>;
  createCalendar: (payload: Calendar) => Promise<void>;
  updateCalendar: (id: string, payload: Calendar) => Promise<void>;
  deleteCalendar: (id: string) => Promise<void>;
}

export const CalendarContext = createContext({} as ContextProps);
