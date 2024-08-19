export type RecordRes = {
    id: string;
    amount: number;
    transactionDate: string;
    description: string;
    categoryId: string;
    memberId: string;
    bookId: string;
    type: "IN" | "OUT";
}

export type DateState = {
  year: number;
  month: number;
  day: number;
};
