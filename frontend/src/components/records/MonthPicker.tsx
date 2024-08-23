import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const MONTHS = [
  {
    label: "1月",
    value: 1,
  },
  {
    label: "2月",
    value: 2,
  },
  {
    label: "3月",
    value: 3,
  },
  {
    label: "4月",
    value: 4,
  },
  {
    label: "5月",
    value: 5,
  },
  {
    label: "6月",
    value: 6,
  },
  {
    label: "7月",
    value: 7,
  },
  {
    label: "8月",
    value: 8,
  },
  {
    label: "9月",
    value: 9,
  },
  {
    label: "10月",
    value: 10,
  },
  {
    label: "11月",
    value: 11,
  },
  {
    label: "12月",
    value: 12,
  },
];

type Props = {
  currentMonth: number;
  currentYear: number;
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
};

export default function MonthPicker({
  currentMonth,
  currentYear,
  onYearChange,
  onMonthChange,
}: Props) {
  return (
    <div className="inline-block rounded-lg w-full min-[520px]:w-80 bg-white shadow-xl p-1">
      <div className="flex justify-between">
        <Button
          variant="ghost"
          className=" active:bg-slate-200 text-gray-800 font-bold py-2 px-3 rounded-l"
          onClick={() => onYearChange(-1)}
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </Button>
        <div className=" text-gray-800 font-bold py-2 px-3 rounded-l">
          {currentYear}
        </div>
        <Button
          variant="ghost"
          className=" active:bg-slate-200 text-gray-800 font-bold py-2 px-3 rounded-r"
          onClick={() => onYearChange(1)}
        >
          <ChevronRightIcon className="h-6 w-6" />
        </Button>
      </div>
      <div className="flex-1">
        <div className="grid  grid-cols-4">
          {MONTHS.map((month) => {
            return (
              <Button
                key={month.value}
                variant="ghost"
                className={clsx(
                  "text-md p-1 active:bg-slate-200",
                  month.value === currentMonth ? "bg-slate-200" : "bg-white"
                )}
                onClick={() => onMonthChange(month.value)}
              >
                {month.label}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
