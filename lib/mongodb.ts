import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI 환경 변수가 설정되지 않았습니다 (.env.local 확인).");
}

// dev 환경의 핫 리로드에서 연결이 계속 늘어나지 않도록 전역에 캐시한다.
const globalForMongo = globalThis as unknown as {
  _mongoClient?: Promise<MongoClient>;
};

export const clientPromise: Promise<MongoClient> =
  globalForMongo._mongoClient ??
  (globalForMongo._mongoClient = new MongoClient(uri).connect());
