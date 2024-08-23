import MainContent from "@/components/records/MainContent";
import { getCategoriesByBookId } from "@/services/category";
import { getMembersByBookId } from "@/services/member";

export default async function Page({ params }: { params: { bookId: string } }) {
  const { bookId } = params;
  const members = await getMembersByBookId(bookId);
  const categories = await getCategoriesByBookId(bookId);

  return (
    <div className="bg-background">
      <MainContent members={members} categories={categories} />
    </div>
  );
}
