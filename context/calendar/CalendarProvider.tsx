import { FC, ReactNode, useReducer, useCallback } from "react";
import { CalendarContext, calendarReducer } from ".";
import { Calendar } from "../../interfaces";
import { CalendarService } from "../../services";

interface ProviderProps {
  children: ReactNode;
}

export interface State {
  calendar: Calendar;
}

const INITIAL_STATE: State = {
  calendar: {} as Calendar
};

export const CalendarProvider: FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(calendarReducer, INITIAL_STATE);

  const getCalendarByMedicId = useCallback(async (medic_id: string) => {
    const data = await CalendarService.getCalendarByMedicId(medic_id);
    dispatch({ type: "GET_CALENDAR", payload: data });
    return data;
  }, []);

  const createCalendar = async (payload: Calendar) => {
    const data = await CalendarService.createOne(payload);
    dispatch({ type: "GET_CALENDAR", payload: data });
    return data;
  };

  const updateCalendar = async (id: string, payload: Calendar) => {
    const data = await CalendarService.updateOne(id, payload);
    dispatch({ type: "GET_CALENDAR", payload: data });
    return data;
  };

  const deleteCalendar = async (id: string) => {
    const data = await CalendarService.deleteOne(id);
    dispatch({ type: "GET_CALENDAR", payload: data });
    return data;
  };
  return (
    <CalendarContext.Provider
      value={{
        ...state,
        getCalendarByMedicId,
        createCalendar,
        updateCalendar,
        deleteCalendar,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
