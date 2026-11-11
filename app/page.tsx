import LinkList from "./LinkList";

export default function Home() {
  return (
    <main className="container">
      <div className="profile" role="img" aria-label="장세민 프로필 사진" />
      <div className="intro">
        <p className="name">장세민</p>
        <p className="bio">풀스택 개발자 | 요즘에는 AI 개발에 관심이 많아요</p>
      </div>

      <LinkList />
    </main>
  );
}
