import { getMembersByBookId } from "@/services/member";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { bookId: string } }
) {
  const bookId = params.bookId;
  console.log("bookId:", bookId);

  const data = await getMembersByBookId(bookId);
  console.log("data in route handler", data);
  return Response.json({ data });
}
