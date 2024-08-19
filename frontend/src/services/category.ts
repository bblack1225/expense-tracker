import { GetCategoriesResponse } from "@/types/category";
import axiosInstance from "./axiosInstance";

export const getCategoriesByBookId = async (
  bookId: string
): Promise<GetCategoriesResponse> => {
  const res = await axiosInstance.get(`/api/books/${bookId}/categories`);
  return res.data;
};
