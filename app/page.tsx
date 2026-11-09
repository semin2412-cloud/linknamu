const links = [
  { label: "링크 1", href: "#" },
  { label: "링크 2", href: "#" },
  { label: "링크 3", href: "#" },
];

export default function Home() {
  return (
    <main className="container">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="profile" src="/profile.png" alt="장세민 프로필 사진" />
      <p className="intro">장세민 클로드코드 공부중</p>

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
