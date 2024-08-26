import { z } from "zod";

export const RecordFormSchema = z.object({
  transactionDate: z.string().min(1, { message: "請選擇日期" }),
  category: z.string().min(1, { message: "請選擇類別" }),
  amount: z
    .string()
    .min(1, { message: "金額不得為空" })
    .default("")
    .refine((val) => !isNaN(Number(val)), { message: "無效金額" })
    .refine((val) => Number(val) > 0, { message: "金額必須大於0" }),
  member: z.string().min(1, { message: "請選擇成員" }),
  description: z.string(),
});

export type RecordFormInput = z.infer<typeof RecordFormSchema>;
