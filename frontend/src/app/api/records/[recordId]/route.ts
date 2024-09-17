import { updateRecord } from "@/services/record";
import { NextRequest } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { recordId: string } }
) {
  const { recordId } = params;
  const body = await request.json();
  const res = await updateRecord(recordId, body);
  return Response.json(res);
}
