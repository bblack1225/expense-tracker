import { createRecord, getRecordsByBookIdAndDate } from "@/services/record";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { bookId: string } }
) {
  const bookId = params.bookId;
  const searchParams = request.nextUrl.searchParams;
  const start = searchParams.get("start");
  const end = searchParams.get("end");
  const res = await getRecordsByBookIdAndDate(bookId, start, end);

  return Response.json(res);
}

export async function POST(
  request: NextRequest
  // { params }: { params: { bookId: string } }
) {
  // const bookId = params.bookId;
  const data = await request.json();

  const res = await createRecord(data);

  return Response.json(res);
}
