import type { Metadata } from "next";
import { Inter, Noto_Sans_SC } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSC = Noto_Sans_SC({ subsets: ["latin"], weight: ["400", "700", "900"], variable: "--font-noto-sc" });

export const metadata: Metadata = {
  title: "火牛AIGC | AIGC+全域电商增长一体化服务商",
  description: "广州火牛智能物联网有限公司 — 以人工智能重塑内容生产模式，驱动品牌从0到亿的全链路电商增长。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className={`${inter.variable} ${notoSC.variable}`}>
      <body className="font-sans antialiased text-white bg-[#0A0A14] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
