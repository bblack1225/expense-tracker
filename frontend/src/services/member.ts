import { Category, GetCategoriesResponse } from "@/types/category";
import axiosInstance from "./axiosInstance";
import { Member } from "@/types/member";

export const getMembersByBookId = async (bookId: string): Promise<Member[]> => {
  const res = await axiosInstance.get(`/api/books/${bookId}/members`);
  return res.data;
};
