"use client"
import { GroupCategories } from "@/types/category";
import { MemberQuery } from "@/types/member";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DateState, RecordRes } from "@/types/record";
import { getRecordsByBookIdAndDate } from "@/services/record";
import { getCalendarRange, parseToDateSlash } from "@/lib/dateUtil";
import { useParams } from "next/navigation";
import CalendarViewRecords from "./CalendarViewRecords";

type Props = {
  categories: GroupCategories;
  members: MemberQuery[];
};


export type MonthRecords = {
  records: GroupRecords;
  income: number;
  expense: number;
};

export type GroupRecords = {
  [key: string]: {
    data: RecordRes[];
    income: number;
    expense: number;
  }
};

const fetchRecords = async (bookId: string, year: number, month: number) => {
  const { start, end } = getCalendarRange(year, month);

  const res = await getRecordsByBookIdAndDate(bookId, start, end) 
  return res;
};

const filterByMonth = (groupRecords: GroupRecords, month: number) => {
  return Object.keys(groupRecords)
    .filter((date) => new Date(date).getMonth() + 1 === month)
    .reduce(
      (obj: MonthRecords, key) => {
        const record = groupRecords[key];
        obj.records[key] = groupRecords[key];
        obj.income += record.income;
        obj.expense += record.expense;
        return obj;
      },
      { records: {}, income: 0, expense: 0 }
    );
};

const transformRecords = (data: RecordRes[], currentMonth: number) => {
  const calendarRecords = data.reduce((acc: GroupRecords, record: RecordRes) => {
    const date = record.transactionDate;
    const amount = record.amount;
    const formatDate = parseToDateSlash(date);

    if (!acc[formatDate]) {
      acc[formatDate] = { data: [], income: 0, expense: 0 };
    }
    acc[formatDate].data.push(record);
    if (record.type === "IN") {
      acc[formatDate].income += amount;
    } else {
      acc[formatDate].expense += amount;
    }
    return acc;
  }, {});
  const listRecords = filterByMonth(calendarRecords, currentMonth);

  return { calendarRecords, listRecords, data };
};

export default function MainContent({ categories, members }: Props) {
  const params = useParams<{bookId: string}>();
  const { bookId } = params;
  console.log('bookId', bookId);
  
  const [currentDate, setCurrentDate] = useState<DateState>({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  });
  const handleDateChange = (monthVal: number, dayVal?: number) => {
    let newMonth;
    let newYear;
    let newDay = dayVal ? dayVal : currentDate.day;
    if (monthVal > 12) {
      newMonth = 1;
      newYear = currentDate.year + 1;
    } else if (monthVal < 1) {
      newMonth = 12;
      newYear = currentDate.year - 1;
    } else {
      newMonth = monthVal;
      newYear = currentDate.year;
    }
    const lastDayOfMonth = new Date(newYear, newMonth, 0).getDate();

    if (newDay > lastDayOfMonth) {
      newDay = lastDayOfMonth;
    }

    setCurrentDate({
      year: newYear,
      month: newMonth,
      day: newDay,
    });
  };

  const handleYearChange = (val: number) => {
    setCurrentDate((prev) => ({ ...prev, year: val }));
  };

  const {
    data: records = {
      data: [],
      listRecords: { records: {}, income: 0, expense: 0 },
      calendarRecords: {},
    },
    isPending,
  } = useQuery({
    queryKey: ["records", currentDate.year, currentDate.month],
    queryFn: () => fetchRecords(bookId, currentDate.year, currentDate.month),
    select: (data: RecordRes[]) =>
      transformRecords(data, currentDate.month),
  });

  return (
    <Tabs defaultValue="list" className="w-full mt-2 ">
      <div className="px-3">
        <TabsList className="grid w-full grid-cols-2 ">
          <TabsTrigger value="list">清單</TabsTrigger>
          <TabsTrigger value="calendar">行事曆</TabsTrigger>
        </TabsList>
      </div>
      {/* <DatePickerBar
        onDateChange={handleDateChange}
        onYearChange={handleYearChange}
        currentDate={currentDate}
      /> */}
      {isPending ? (
        <div className="flex justify-center items-center h-50 font-extrabold text-xl">
          載入中...
        </div>
      ) : (
        <>
          <TabsContent value="list">
            <div className="px-3">
              {/* <ListOverview
                income={records.listRecords.income}
                expense={records.listRecords.expense}
              /> */}
              {Object.keys(records.listRecords.records).length === 0 ? (
                <p className="text-slate-500 font-bold">
                  沒有資料。點擊右上角新增紀錄。
                </p>
              ) : (
                <>
                  {/* <ListViewTable
                    groupRecords={records.listRecords.records}
                    categories={categories}
                    members={members}
                  /> */}
                </>
              )}
            </div>
          </TabsContent>
          <TabsContent value="calendar">
            <CalendarViewRecords
              currentDate={currentDate}
              onDateChange={handleDateChange}
              groupRecords={records.calendarRecords}
              categories={categories}
              members={members}
            />
          </TabsContent>
        </>
      )}
    </Tabs>
  );
}
