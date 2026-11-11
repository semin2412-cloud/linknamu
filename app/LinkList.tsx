"use client";

import { useEffect, useState } from "react";
import { links } from "./links";

export default function LinkList() {
  // 데이터를 받기 전에는 값이 없으므로 0회로 표시한다.
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch("/api/clicks", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: Record<string, number>) => setCounts(data))
      .catch((error) => console.error("클릭수 조회 실패", error));
  }, []);

  function handleClick(id: string) {
    // 화면은 바로 +1, 서버 응답이 오면 실제 값으로 맞춘다.
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
    fetch("/api/clicks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
      keepalive: true,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then(({ count }: { count: number }) =>
        setCounts((prev) => ({ ...prev, [id]: count })),
      )
      .catch((error) => console.error("클릭수 저장 실패", error));
  }

  return (
    <nav className="links">
      {links.map((link) => (
        <a
          key={link.id}
          className="link"
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleClick(link.id)}
        >
          <span className="link-label">{link.label}</span>
          <span className="link-count">{counts[link.id] ?? 0}회</span>
        </a>
      ))}
    </nav>
  );
}
