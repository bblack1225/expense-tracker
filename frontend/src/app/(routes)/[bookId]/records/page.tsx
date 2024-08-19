import { getCategoriesByBookId } from "@/services/category";
import { getMembersByBookId } from "@/services/member";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";

export default async function Page({ params }: { params: { bookId: string } }) {
  const { bookId } = params;
  const members = await getMembersByBookId(bookId);
  const categories = await getCategoriesByBookId(bookId);
  console.log("members", members);
  console.log("categories", categories);

  return (
    <div className="bg-background">
      <div className="flex items-center justify-between px-3">
        <h1 className="text-2xl font-bold">收支紀錄</h1>
        <Link
          href="/records/create"
          className="bg-primary	py-1 text-white font-bold rounded-lg px-4 hover:bg-slate-950 shadow-md"
        >
          新增紀錄
        </Link>
      </div>
      {/* <HydrationBoundary state={dehydrate(queryClient)}> */}
      {/* <MainContent categories={categories} members={members} /> */}
      {/* </HydrationBoundary> */}
    </div>
  );
}
