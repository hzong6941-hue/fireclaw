import type { Metadata } from 'next';
import { Inter, Noto_Sans_SC } from 'next/font/google';
import { Inspector } from 'react-dev-inspector';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-noto-sans-sc',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: '火牛AIGC — 以火焰点燃智能',
    template: '%s | 火牛AIGC',
  },
  description:
    '火牛AIGC，AI驱动的创意内容生成平台。以火焰点燃智能，以创新驱动增长。',
  keywords: [
    '火牛AIGC',
    'AI Generated Content',
    'AIGC',
    'AI创意',
    'AI内容生成',
    '智能创作',
  ],
  authors: [{ name: '火牛AIGC' }],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.COZE_PROJECT_ENV === 'DEV';

  return (
    <html lang="zh-CN" className={`${inter.variable} ${notoSansSC.variable}`}>
      <body className="antialiased">
        {isDev && <Inspector />}
        {children}
      </body>
    </html>
  );
}
