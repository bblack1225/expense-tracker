import clsx from "clsx";

type Props = {
  income: number;
  expense: number;
};

export default function ListOverview({ income, expense }: Props) {
  const total = income - expense;
  return (
    <div className="flex justify-between bg-background pb-2">
      <div className="flex flex-col flex-1 items-center">
        <p className="text-emerald-500 font-bold text-lg">
          {income.toLocaleString("en-US")}
        </p>
        <p className="text-gray-500">收入</p>
      </div>
      <div className="flex flex-col flex-1 items-center">
        <p className="text-red-500 font-bold text-lg">
          {expense.toLocaleString("en-US")}
        </p>
        <p className="text-gray-500">支出</p>
      </div>
      <div className="flex flex-col flex-1 items-center">
        <p
          className={clsx(
            "font-bold text-lg",
            total > 0 ? "text-emerald-500" : "text-red-500"
          )}
        >
          {total.toLocaleString("en-US")}
        </p>
        <p className="text-gray-500">總計</p>
      </div>
    </div>
  );
}
