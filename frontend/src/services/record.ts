import { CreateRecordRequest, RecordRes } from "@/types/record";
import axiosBackendInstance from "./axiosInstance";
import { getCalendarRange } from "@/lib/dateUtil";

export const getRecordsByBookIdAndDate = async (
  bookId: string,
  start: string | null,
  end: string | null
): Promise<RecordRes[]> => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;

  let startDate;
  let endDate;
  if (start && end) {
    startDate = start;
    endDate = end;
  } else {
    const { start: startRange, end: endRange } = getCalendarRange(year, month);
    startDate = startRange;
    endDate = endRange;
  }
  const res = await axiosBackendInstance.get(
    `/books/${bookId}/records?start=${startDate}&end=${endDate}`
  );
  return res.data;
};

export const createRecord = async (data: CreateRecordRequest) => {
  const res = await axiosBackendInstance.post(`/records`, data);
  return res.data;
};
