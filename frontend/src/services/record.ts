import { RecordRes } from "@/types/record";
import axiosInstance from "./axiosInstance"

export const getRecordsByBookIdAndDate = 
async(bookId: string, start: string, end: string):Promise<RecordRes[]>  => {
  const res = await axiosInstance.get(`/api/books/${bookId}?start=${start}&end=${end}`);
  return res.data;   
}