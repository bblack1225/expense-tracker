import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { useState } from "react";
import { DateState } from "@/types/record";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import MonthPicker from "./MonthPicker";
import { useCurrentDateStore } from "@/providers/current-date-store-provider";

export default function DatePickerBar() {
  const [isDetailShow, setIsDetailShow] = useState(false);
  const { currentDate, setCurrentDate, onDateChange } = useCurrentDateStore(
    (state) => state
  );
  const { year, month } = currentDate;
  const handleYearChange = (val: number) => {
    setCurrentDate({ ...currentDate, year: val });
  };
  return (
    <div className="flex flex-col  justify-between my-2 w-full relative px-3">
      <div className="flex ">
        <div>
          <Button
            variant="ghost"
            className=" active:bg-slate-200 text-gray-800 font-bold py-2 px-3 rounded-l"
            onClick={() => onDateChange(month - 1)}
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </Button>
        </div>
        <div
          className="flex items-center justify-center flex-1"
          onClick={() => setIsDetailShow((prev) => !prev)}
        >
          {`${year}年`}
          {`${month}月`}
        </div>
        <div>
          <Button
            variant="ghost"
            className=" active:bg-slate-200 text-gray-800 font-bold py-2 px-3 rounded-r"
            onClick={() => onDateChange(month + 1)}
          >
            <ChevronRightIcon className="h-6 w-6 " />
          </Button>
        </div>
      </div>
      <div
        className={clsx(
          `flex absolute inset-x-0 top-10 min-[520px]:justify-center`,
          {
            hidden: !isDetailShow,
          }
        )}
      >
        <MonthPicker
          currentMonth={month}
          currentYear={year}
          onMonthChange={(val) => {
            onDateChange(val);
            setIsDetailShow(false);
          }}
          onYearChange={(val) => handleYearChange(year + val)}
        />
      </div>
    </div>
  );
}
