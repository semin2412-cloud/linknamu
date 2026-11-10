const links = [
  { label: "🐙 깃허브", href: "https://github.com/semin2412-cloud" },
  { label: "✉️ 내 블로그", href: "https://blog.naver.com/semin2412" },
  { label: "📫 이메일", href: "semin2412@gmail.com" },
  { label: "📸 인스타그램", href: "https://www.instagram.com/semin.jang7" },
];

export default function Home() {
  return (
    <main className="container">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="profile"
        src="/profile.jpg"
        alt="장세민 프로필 사진"
      />
      <div className="intro">
        <p className="name">장세민</p>
        <p className="bio">풀스택 개발자 | 요즘에는 AI 개발에 관심이 많아요</p>
      </div>

      <nav className="links">
        {links.map((link) => (
          <a
            key={link.label}
            className="link"
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </main>
  );
}
