import { getWeekDay } from "@/lib/dateUtil";
import { GroupCategories } from "@/types/category";
import { MemberQuery } from "@/types/member";
import { GroupRecords } from "@/types/record";
import RecordItem from "./RecordItem";

type Props = {
  categories: GroupCategories;
  members: MemberQuery[];
  groupRecords: GroupRecords;
};

export default function ListViewTable({
  groupRecords,
  categories,
  members,
}: Props) {
  return (
    <>
      {Object.entries(groupRecords).map(([date, records]) => {
        return (
          <div key={date} className="rounded-md  border my-2">
            <div className="border-b p-2  border-slate-400	 flex justify-between">
              <div className="font-bold">
                {date} {getWeekDay(date)}
              </div>
            </div>
            {records.data.map((item) => {
              return (
                <RecordItem
                  key={item.id}
                  members={members}
                  categories={categories}
                  item={item}
                />
              );
            })}
            <div className="flex justify-end px-3 py-2 gap-1">
              <span className="font-medium text-right">
                收入${records.income.toLocaleString("en-US")} 支出$
                {records.expense.toLocaleString("en-US")}
              </span>
              <span className="font-bold text-right underline underline-offset-4">
                合計$
                {(records.income - records.expense).toLocaleString("en-US")}
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
}
