// app/diagnose/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DiagnosePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [accuracy, setAccuracy] = useState(34);
  
  // ユーザーの入力（全部無視される）
  const [birthdate, setBirthdate] = useState('');
  const [color, setColor] = useState('');
  const [luckyNumber, setLuckyNumber] = useState('');
  const [mood, setMood] = useState('');
  
  // ローディング状態
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
      setAccuracy(accuracy + 21);
    } else {
      startLoading();
    }
  };

  const startLoading = () => {
    setIsLoading(true);
    const messages = [
      'あなたの気分を解析中...',
      '生年月日から運命の数字を計算中...',
      '宇宙の真理と照合中...',
      'あなたのタイプを判定中...',
      '診断完了！知らんけど。'
    ];
    
    let index = 0;
    setLoadingText(messages[0]);
    
    const interval = setInterval(() => {
      index++;
      if (index < messages.length) {
        setLoadingText(messages[index]);
      } else {
        clearInterval(interval);
        router.push(`/result?date=${birthdate}`);
      }
    }, 1500);
  };

  const canProceed = () => {
    if (step === 1) return birthdate !== '';
    if (step === 2) return color !== '';
    if (step === 3) return luckyNumber !== '';
    if (step === 4) return mood !== '';
    return false;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
        <div className="w-full max-w-sm text-center space-y-6">
          <div className="text-4xl mb-8">🔮</div>
          <p className="text-xl font-bold">{loadingText}</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-black h-2 rounded-full animate-pulse" style={{width: '98%'}}></div>
          </div>
          <p className="text-sm text-gray-600">診断精度: 98%</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
      <div className="w-full max-w-sm space-y-6">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">知らんけど診断</h1>
          <p className="text-sm text-gray-600">診断精度: {accuracy}%</p>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">あなたの生年月日は？</h2>
            <input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="w-full text-lg p-4 border rounded-lg"
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">好きな色は？</h2>
            <div className="space-y-2">
              {[
                { value: 'red', label: '赤（情熱と勇気の象徴）' },
                { value: 'blue', label: '青（知性と冷静さの象徴）' },
                { value: 'green', label: '緑（癒しと成長の象徴）' },
                { value: 'yellow', label: '黄（明るさと希望の象徴）' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setColor(option.value)}
                  className={`w-full text-left p-4 border rounded-lg ${
                    color === option.value ? 'bg-black text-white' : 'bg-white'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">あなたのラッキーナンバーは？</h2>
            <p className="text-sm text-gray-600">1から100の間で入力してください</p>
            <input
              type="number"
              min="1"
              max="100"
              value={luckyNumber}
              onChange={(e) => setLuckyNumber(e.target.value)}
              placeholder="例: 7"
              className="w-full text-lg p-4 border rounded-lg"
            />
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">今の気分は？</h2>
            <div className="space-y-2">
              {[
                { value: 'excited', label: 'ワクワクしている（未来志向型）' },
                { value: 'calm', label: '落ち着いている（現在重視型）' },
                { value: 'anxious', label: '不安がある（過去執着型）' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setMood(option.value)}
                  className={`w-full text-left p-4 border rounded-lg ${
                    mood === option.value ? 'bg-black text-white' : 'bg-white'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className="w-full text-lg font-bold bg-black text-white p-4 rounded-lg disabled:opacity-30"
        >
          {step === 4 ? '診断する' : '次へ'}
        </button>

        <div className="flex justify-center gap-2 mt-8">
          {[1, 2, 3, 4].map(i => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i <= step ? 'bg-black' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
