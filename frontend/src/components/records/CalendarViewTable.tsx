import { GroupCategories } from "@/types/category";
import { MemberQuery } from "@/types/member";
import { DateState, RecordRes } from "@/types/record";
import { formatToYYYYMMDD } from "@/lib/dateUtil";
import clsx from "clsx";
import RecordItem from "./RecordItem";

const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"];

type Props = {
  currentDate: DateState;
  onDateChange: (month: number, day: number) => void;
  groupRecords: {
    [key: string]: {
      data: RecordRes[];
      income: number;
      expense: number;
    };
  };
  categories: GroupCategories;
  members: MemberQuery[];
};

export default function CalendarViewTable({
  currentDate,
  onDateChange,
  groupRecords,
  categories,
  members,
}: Props) {
  const { year, month, day } = currentDate;
  const daysInMonth = new Date(year, month, 0).getDate();

  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
  const lastDayOfLastMonth = new Date(year, month - 1, 0).getDate();

  const daysOfLastMonth = Array.from(
    { length: firstDayOfMonth },
    (_, i) => lastDayOfLastMonth - i
  ).reverse();

  const daysOfNextMonth = Array.from(
    { length: 42 - daysInMonth - firstDayOfMonth },
    (_, i) => i + 1
  );

  const handleLastMonthDayChange = (day: number) => {
    onDateChange(month - 1, day);
  };

  const handleNextMonthDayChange = (day: number) => {
    onDateChange(month + 1, day);
  };

  const slashFormatDate = formatToYYYYMMDD(year, month, day);

  const records = groupRecords[slashFormatDate] || {
    data: [],
    income: 0,
    expense: 0,
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col p-1 w-full min-[520px]:w-80 my-0 mx-auto">
        <div className="grid grid-cols-7">
          {WEEKDAYS.map((day) => (
            <div key={day} className="flex justify-center  py-2 font-bold ">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 grid-rows-6 gap-px px-px ">
          {daysOfLastMonth.map((day) => {
            const formattedDate = formatToYYYYMMDD(year, month - 1, day);
            const hasRecord = groupRecords[formattedDate];

            return (
              <div
                key={day}
                className={clsx(
                  "py-1 flex flex-col items-center font-bold text-stone-400 hover:text-stone-500 hover:bg-stone-100 hover:rounded-lg  hover:cursor-pointer"
                )}
                onClick={() => handleLastMonthDayChange(day)}
              >
                <div>{day}</div>
                <span
                  className={clsx(
                    "w-1.5 h-1.5 rounded-full",
                    hasRecord ? "bg-red-400" : "bg-transparent"
                  )}
                />
              </div>
            );
          })}
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
            (dayVal) => {
              const formattedDate = formatToYYYYMMDD(year, month, dayVal);
              const hasRecord = groupRecords[formattedDate];

              return (
                <div
                  key={dayVal}
                  className={clsx(
                    " py-1 flex flex-col items-center font-bold text-gray-800 hover:bg-neutral-200 hover:rounded-lg hover:cursor-pointer",
                    day === dayVal && "bg-neutral-200 rounded-lg"
                  )}
                  onClick={() => onDateChange(month, dayVal)}
                >
                  <div>{dayVal}</div>

                  <span
                    className={clsx(
                      "w-1.5 h-1.5 rounded-full",
                      hasRecord ? "bg-red-400" : "bg-transparent"
                    )}
                  />
                </div>
              );
            }
          )}
          {daysOfNextMonth.map((day) => {
            const formattedDate = formatToYYYYMMDD(year, month + 1, day);
            const hasRecord = groupRecords[formattedDate];
            return (
              <div
                key={day}
                className=" py-1 flex flex-col items-center font-bold text-stone-400 hover:text-stone-500 hover:bg-stone-100 hover:rounded-lg  hover:cursor-pointer"
                onClick={() => handleNextMonthDayChange(day)}
              >
                <div>{day}</div>
                {hasRecord && (
                  <span className="w-1.5 bg-red-300 h-1.5 rounded-full" />
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="border-b-2 border-gray-500 " />
      <div className="flex justify-between  px-3 py-2">
        <div>
          支出:
          <span className="text-amber-500">
            ${records.expense.toLocaleString("en-US")}
          </span>
        </div>
        <div>
          收入:
          <span className="text-green-600 font-medium">
            ${records.income.toLocaleString("en-US")}
          </span>
        </div>
        <div>
          合計:
          <span className="text-red-500">
            ${(records.income - records.expense).toLocaleString("en-US")}
          </span>
        </div>
      </div>
      <div className="border-b-2 border-gray-500 " />
      {records.data.length === 0 ? (
        <p className="p-2">查無資料</p>
      ) : (
        <>
          {records.data.map((record) => (
            <RecordItem
              key={record.id}
              categories={categories}
              members={members}
              item={record}
              borderStyle="border-gray-500 border-2"
            />
          ))}
        </>
      )}
    </div>
  );
}
