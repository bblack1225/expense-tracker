import axiosInstance from "./axiosInstance";
import { MemberQuery } from "@/types/member";

export const getMembersByBookId = async (bookId: string): Promise<MemberQuery[]> => {
  const res = await axiosInstance.get(`/api/books/${bookId}/members`);
  return res.data;
};
