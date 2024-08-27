export type RecordRes = {
  id: string;
  amount: number;
  transactionDate: string;
  description: string;
  categoryId: string;
  memberId: string;
  bookId: string;
  type: "IN" | "OUT";
};

export type DateState = {
  year: number;
  month: number;
  day: number;
};

export type GroupRecords = {
  [key: string]: {
    data: RecordRes[];
    income: number;
    expense: number;
  };
};

export type MonthRecords = {
  records: GroupRecords;
  income: number;
  expense: number;
};

export type CreateRecordRequest = {
  amount: number;
  transactionDate: string;
  description: string;
  categoryId: string;
  memberId: string;
  bookId: string;
  type: "IN" | "OUT";
};
