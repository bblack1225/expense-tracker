import axiosBackendInstance from "./axiosInstance";
import { MemberQuery } from "@/types/member";

export const getMembersByBookId = async (
  bookId: string
): Promise<MemberQuery[]> => {
  const res = await axiosBackendInstance.get(`/books/${bookId}/members`);
  return res.data;
};
