// lib/diagnosis.ts
import { RESULTS } from '@/data/layer1_results';

export const generateLieResult = (birthdate: string) => {
  // 生年月日から適当にインデックス生成
  const hash = birthdate.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  const index = hash % RESULTS.length;
  
  return {
    body: RESULTS[index]
  };
};

