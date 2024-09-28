import { deleteRecord, updateRecord } from "@/services/record";
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { recordId: string } }
) {
  const { recordId } = params;
  const res = await deleteRecord(recordId);
  if (res.status === 204) {
    return new Response(null, { status: 204 });
  }
  return Response.json(res);
}
