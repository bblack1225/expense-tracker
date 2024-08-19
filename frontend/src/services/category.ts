import { GroupCategories } from "@/types/category";
import axiosInstance from "./axiosInstance";

export const getCategoriesByBookId = async (
  bookId: string
): Promise<GroupCategories> => {
  const res = await axiosInstance.get(`/api/books/${bookId}/categories`);
  return res.data;
};
