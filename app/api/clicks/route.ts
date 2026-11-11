import { clientPromise } from "@/lib/mongodb";
import { links } from "@/app/links";

export const dynamic = "force-dynamic";

const linkIds = links.map((link) => link.id);

type ClickDoc = { _id: string; count: number };

async function collection() {
  const client = await clientPromise;
  return client.db().collection<ClickDoc>("clicks");
}

// 모든 링크의 클릭수를 한 번에 반환: { github: 3, blog: 0, ... }
export async function GET() {
  try {
    const docs = await (await collection()).find().toArray();
    const counts: Record<string, number> = Object.fromEntries(
      linkIds.map((id) => [id, 0]),
    );
    for (const doc of docs) {
      if (doc._id in counts) counts[doc._id] = doc.count;
    }
    return Response.json(counts, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("GET /api/clicks 실패", error);
    return Response.json({ error: "클릭수를 불러오지 못했습니다." }, { status: 500 });
  }
}

// 클릭수 1 증가: body { id } → { id, count }
export async function POST(request: Request) {
  let id: unknown;
  try {
    ({ id } = await request.json());
  } catch {
    return Response.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }
  if (typeof id !== "string" || !linkIds.includes(id)) {
    return Response.json({ error: "알 수 없는 링크입니다." }, { status: 400 });
  }

  try {
    const doc = await (await collection()).findOneAndUpdate(
      { _id: id },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: "after" },
    );
    return Response.json({ id, count: doc?.count ?? 1 });
  } catch (error) {
    console.error("POST /api/clicks 실패", error);
    return Response.json({ error: "클릭수를 저장하지 못했습니다." }, { status: 500 });
  }
}
