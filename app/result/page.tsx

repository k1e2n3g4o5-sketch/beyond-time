// app/result/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { generateLieResult } from '@/lib/diagnosis';

const IMMUTABLE_COORDINATE_PART = '4c6f8d4e';
const STORE_REDIRECT_URL = 'https://apps.apple.com/';

export default function ResultPage() {
  const searchParams = useSearchParams();
  const birthdate = searchParams.get('date') || '';
  const [result, setResult] = useState<{ body: string } | null>(null);
  const [keyInput, setKeyInput] = useState('');

  useEffect(() => {
    if (birthdate) {
      setResult(generateLieResult(birthdate));
    }
  }, [birthdate]);

  const handleKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyInput.trim().toLowerCase() === IMMUTABLE_COORDINATE_PART) {
      alert("おめでとうございます。真実への扉が開きます。");
      window.location.href = STORE_REDIRECT_URL;
    } else {
      alert("鍵が違います。");
    }
  };

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <p>診断中...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
      <div className="w-full max-w-sm space-y-6">
        
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">診断結果</h1>
          <p className="text-lg border-b pb-4">{result.body}</p>
          
          <p className="text-sm font-mono text-red-600">
            診断ID: {IMMUTABLE_COORDINATE_PART}
          </p>
        </div>

        <p className="text-center text-base">この結果に満足ですか？</p>

        <form onSubmit={handleKeySubmit} className="space-y-4">
          <input
            type="text"
            placeholder="真実の鍵を持っていますか？"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            className="w-full text-base p-4 border rounded-lg focus:border-black"
          />
          <button
            type="submit"
            className="w-full text-lg font-bold bg-black text-white p-4 rounded-lg hover:opacity-80 transition"
          >
            次へ
          </button>
        </form>

        <p className="text-xs text-center text-gray-400 mt-8">
          ※隠された真実があります
        </p>
      </div>
    </div>
  );
}
