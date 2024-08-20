import { GroupCategories } from "@/types/category";
import axiosBackendInstance from "./axiosInstance";

export const getCategoriesByBookId = async (
  bookId: string
): Promise<GroupCategories> => {
  const res = await axiosBackendInstance.get(`/books/${bookId}/categories`);
  return res.data;
};
