import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "장세민 | 링크나무",
  description: "내 모든 링크를 한 페이지에 모아 두고, 하나의 URL로 공유하세요.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
