import { create, createStore } from "zustand";

export type CurrentDateState = {
  currentDate: {
    year: number;
    month: number;
    day: number;
  };
};

export type CurrentDateAction = {
  setCurrentDate: (date: CurrentDateState["currentDate"]) => void;
  onDateChange: (month: number, day?: number) => void;
};

export type CurrentDateStore = CurrentDateState & CurrentDateAction;

export const initCurrentDateStore = (): CurrentDateState => {
  return {
    currentDate: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
    },
  };
};

export const createCurrentDateStore = (initState: CurrentDateState) => {
  return createStore<CurrentDateStore>()((set) => ({
    ...initState,
    setCurrentDate: (date) => set({ currentDate: date }),
    onDateChange: (month, day) =>
      set((state) => {
        const { currentDate } = state;
        let newYear = currentDate.year;
        let newDay = day || currentDate.day;
        if (month > 12) {
          month = 1;
          newYear++;
        } else if (month < 1) {
          month = 12;
          newYear--;
        }
        const lastDayOfMonth = new Date(newYear, month, 0).getDate();
        if (newDay > lastDayOfMonth) {
          newDay = lastDayOfMonth;
        }
        return { currentDate: { year: newYear, month, day: newDay } };
      }),
  }));
};
