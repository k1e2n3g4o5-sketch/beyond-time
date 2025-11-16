// app/layout.tsx
import './globals.css';

export const metadata = {
  title: '知らんけど診断 - Beyond Time',
  description: 'あなたの未来を適当に占います',
};

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="ja">
      <body className="font-sans antialiased text-gray-800">
        {children}
      </body>
    </html>
  );
}

