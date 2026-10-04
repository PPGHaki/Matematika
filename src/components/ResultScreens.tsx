import React from 'react';
import { LevelNumber } from '../types';
import { playMenuSelectSound, playApplauseSound } from '../audio';

interface LevelResultProps {
  level: LevelNumber;
  correctCount: number;
  wrongCount: number;
  tipScoreSpent: number;
  levelScoreGained: number;
  totalScore: number;
  onNextLevel: () => void;
  onRetryLevel: () => void;
  onGoLevelSelect: () => void;
}

export const LevelResultScreen: React.FC<LevelResultProps> = ({
  level,
  correctCount,
  wrongCount,
  tipScoreSpent,
  levelScoreGained,
  totalScore,
  onNextLevel,
  onRetryLevel,
  onGoLevelSelect,
}) => {
  const envNames: Record<LevelNumber, string> = {
    1: 'Lingkungan RT',
    2: 'Lingkungan RW',
    3: 'Lingkungan Desa',
    4: 'Lingkungan Kelurahan',
  };

  const currentEnv = envNames[level];

  return (
    <div className="game-main-card rounded-3xl shadow-2xl p-6 sm:p-8 text-center space-y-6">
      <div className="text-5xl">🏆</div>
      <div>
        <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full font-game uppercase tracking-wider">
          HASIL {currentEnv.toUpperCase()}
        </span>
        <h2 className="font-game text-2xl sm:text-3xl font-extrabold text-emerald-800 mt-2">
          Misi {currentEnv} Selesai!
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          Berikut adalah ringkasan hasil pengerjaanmu untuk level ini:
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
        <div className="bg-emerald-50 border-2 border-emerald-200 p-3.5 rounded-2xl text-center shadow-xs">
          <span className="text-2xl block mb-1">✅</span>
          <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
            Jawaban Benar
          </span>
          <span className="font-game text-2xl font-extrabold text-emerald-700">
            {correctCount}
          </span>
        </div>
        <div className="bg-rose-50 border-2 border-rose-200 p-3.5 rounded-2xl text-center shadow-xs">
          <span className="text-2xl block mb-1">❌</span>
          <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider block">
            Jawaban Salah
          </span>
          <span className="font-game text-2xl font-extrabold text-rose-600">
            {wrongCount}
          </span>
        </div>
        <div className="bg-amber-50 border-2 border-amber-200 p-3.5 rounded-2xl text-center shadow-xs">
          <span className="text-2xl block mb-1">💡</span>
          <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
            Skor untuk Tips
          </span>
          <span className="font-game text-2xl font-extrabold text-amber-600">
            {tipScoreSpent} Poin
          </span>
        </div>
        <div className="bg-teal-50 border-2 border-teal-200 p-3.5 rounded-2xl text-center shadow-xs">
          <span className="text-2xl block mb-1">⭐</span>
          <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider block">
            Skor Level Ini
          </span>
          <span className="font-game text-2xl font-extrabold text-teal-700">
            {levelScoreGained}
          </span>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 max-w-md mx-auto text-xs text-amber-900 font-medium shadow-inner">
        🪙 Total Akumulasi Skor Keseluruhan:{' '}
        <span className="font-bold text-emerald-800 text-sm">{totalScore} Poin</span>
      </div>

      <div className="flex flex-wrap justify-center gap-3.5 pt-3">
        <button
          onClick={() => {
            playMenuSelectSound();
            onNextLevel();
          }}
          className="btn-game-primary text-white font-game font-bold px-7 py-3.5 rounded-2xl flex items-center gap-2 text-sm sm:text-base shadow-md"
        >
          <span>{level < 4 ? `Lanjut ke ${envNames[(level + 1) as LevelNumber]}` : 'Lihat Hasil Akhir Game'}</span>
          <span>➔</span>
        </button>
        <button
          onClick={() => {
            playMenuSelectSound();
            onRetryLevel();
          }}
          className="btn-game-amber text-white font-game font-bold px-6 py-3.5 rounded-2xl flex items-center gap-2 text-sm sm:text-base"
        >
          🔄 Ulangi Level Ini
        </button>
        <button
          onClick={() => {
            playMenuSelectSound();
            onGoLevelSelect();
          }}
          className="btn-game-secondary font-game font-bold px-6 py-3.5 rounded-2xl text-sm sm:text-base"
        >
          📋 Pilih Level
        </button>
      </div>
    </div>
  );
};

interface GrandResultProps {
  score: number;
  onGoLevelSelect: () => void;
  onGoCover: () => void;
}

export const GrandResultScreen: React.FC<GrandResultProps> = ({
  score,
  onGoLevelSelect,
  onGoCover,
}) => {
  let stars = '⭐⭐⭐';
  if (score < 240) stars = '⭐⭐';
  if (score < 120) stars = '⭐';

  React.useEffect(() => {
    playApplauseSound();
  }, []);

  return (
    <div className="game-main-card rounded-3xl shadow-2xl p-8 text-center space-y-6">
      <div className="text-6xl">🎊</div>
      <h2 className="font-game text-3xl font-extrabold text-emerald-800">
        Petualangan Berbagi Selesai!
      </h2>
      <p className="text-gray-600 text-base max-w-md mx-auto">
        Selamat! Kamu telah menyelesaikan seluruh level petualangan pembagian secara adil di Desa Pendem, Kota Batu!
      </p>

      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-6 max-w-sm mx-auto shadow-inner space-y-2">
        <div className="text-3xl text-yellow-500">{stars}</div>
        <div className="text-gray-500 text-xs font-semibold uppercase tracking-wider">
          Total Skor Akhir
        </div>
        <div className="font-game font-extrabold text-4xl text-emerald-700">
          {score}
        </div>
      </div>

      <div className="flex justify-center gap-4 pt-4">
        <button
          onClick={() => {
            playMenuSelectSound();
            onGoLevelSelect();
          }}
          className="btn-game-primary text-white font-game font-bold px-7 py-3.5 rounded-2xl text-base shadow-md"
        >
          📋 Pilih Level Lain
        </button>
        <button
          onClick={() => {
            playMenuSelectSound();
            onGoCover();
          }}
          className="btn-game-secondary font-game font-bold px-6 py-3.5 rounded-2xl text-base"
        >
          🏠 Halaman Utama
        </button>
      </div>
    </div>
  );
};
