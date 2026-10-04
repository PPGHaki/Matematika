import React from 'react';
import { Question, LevelNumber } from '../types';
import { playMenuSelectSound } from '../audio';

interface LevelSelectScreenProps {
  questionBank: Record<LevelNumber, Question[]>;
  onSelectLevel: (level: LevelNumber) => void;
  onBack: () => void;
}

export const LevelSelectScreen: React.FC<LevelSelectScreenProps> = ({
  questionBank,
  onSelectLevel,
  onBack,
}) => {
  const levelsInfo: Array<{
    id: LevelNumber;
    title: string;
    desc: string;
    icon: string;
    colorClass: string;
    borderClass: string;
    badgeBg: string;
  }> = [
    {
      id: 1,
      title: 'Level 1: Lingkungan RT',
      desc: 'Wadah terisi otomatis untuk panduan berbagi di lingkungan RT.',
      icon: '🏘️',
      colorClass: 'from-emerald-400 to-emerald-600 border-emerald-300',
      borderClass: 'border-emerald-400 hover:border-emerald-600',
      badgeBg: 'bg-emerald-200 text-emerald-900 border-emerald-400',
    },
    {
      id: 2,
      title: 'Level 2: Lingkungan RW',
      desc: 'Isi wadah mandiri & gunakan tombol "Cek Jawaban" untuk berbagi di lingkungan RW.',
      icon: '🏡',
      colorClass: 'from-teal-400 to-teal-600 border-teal-300',
      borderClass: 'border-teal-400 hover:border-teal-600',
      badgeBg: 'bg-teal-200 text-teal-900 border-teal-400',
    },
    {
      id: 3,
      title: 'Level 3: Lingkungan Desa',
      desc: 'Pengurangan berulang dengan hasil panen lumbung se-lingkungan Desa.',
      icon: '🌾',
      colorClass: 'from-amber-400 to-amber-600 border-amber-300',
      borderClass: 'border-amber-400 hover:border-amber-600',
      badgeBg: 'bg-amber-200 text-amber-900 border-amber-400',
    },
    {
      id: 4,
      title: 'Level 4: Lingkungan Kelurahan',
      desc: 'Misi analisis multi-langkah (menyisihkan cadangan warga se-lingkungan Kelurahan).',
      icon: '🏛️',
      colorClass: 'from-rose-400 to-rose-600 border-rose-300',
      borderClass: 'border-rose-400 hover:border-rose-600',
      badgeBg: 'bg-rose-200 text-rose-900 border-rose-400',
    },
  ];

  return (
    <div className="game-main-card rounded-3xl shadow-2xl p-6 sm:p-8">
      <div className="text-center mb-8">
        <h2 className="font-game text-2xl sm:text-3xl font-extrabold text-emerald-800 drop-shadow-sm">
          Pilih Lingkungan yang Ingin Kamu Bantu
        </h2>
        <p className="text-gray-700 text-sm mt-1 font-medium">
          Bantu warga membagikan hasil panen secara adil di lingkungan RT, RW, Desa, atau Kelurahan
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {levelsInfo.map((lvl) => {
          const count = questionBank[lvl.id]?.length || 0;
          return (
            <div
              key={lvl.id}
              onClick={() => {
                playMenuSelectSound();
                onSelectLevel(lvl.id);
              }}
              className={`bg-white/95 hover:bg-emerald-50 border-2 border-b-[6px] ${lvl.borderClass} rounded-2xl p-5 cursor-pointer level-cartridge shadow-lg hover:shadow-2xl flex items-center space-x-4`}
            >
              <div
                className={`w-14 h-14 bg-gradient-to-b ${lvl.colorClass} border-2 text-white rounded-2xl flex items-center justify-center text-3xl font-game font-bold flex-shrink-0 shadow-md`}
              >
                {lvl.icon}
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-center">
                  <h3 className="font-game font-bold text-gray-900 text-base sm:text-lg">
                    {lvl.title}
                  </h3>
                  <span
                    className={`text-xs ${lvl.badgeBg} border px-2.5 py-0.5 rounded-full font-bold shadow-xs`}
                  >
                    {count} Soal
                  </span>
                </div>
                <p className="text-xs text-gray-700 mt-1 font-medium">{lvl.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-center flex justify-center items-center">
        <button
          onClick={() => {
            playMenuSelectSound();
            onBack();
          }}
          className="btn-game-secondary px-7 py-3 rounded-xl font-game text-xs sm:text-sm font-bold flex items-center gap-2"
        >
          <i className="fa-solid fa-arrow-left"></i> Kembali ke Halaman Utama
        </button>
      </div>
    </div>
  );
};
