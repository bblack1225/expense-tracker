export type GetCategoriesResponse = {
  inCategories: Category[];
  outCategories: Category[];
};

export type Category = {
  id: string;
  name: string;
  icon: string;
  type: "IN" | "OUT";
  bookId: string;
};
