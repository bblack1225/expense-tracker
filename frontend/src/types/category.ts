export type GroupCategories = {
  inCategories: CategoryRes[];
  outCategories: CategoryRes[];
};

export type CategoryRes = {
  id: string;
  name: string;
  icon: string;
  type: "IN" | "OUT";
  bookId: string;
};
