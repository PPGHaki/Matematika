import React from 'react';
import { playMenuSelectSound } from '../audio';

interface CoverScreenProps {
  onStart: () => void;
}

export const CoverScreen: React.FC<CoverScreenProps> = ({ onStart }) => {
  const narrationText =
    "Selamat datang di Desa Pendem! Saya Pak Kades, bersama warga mari kita bagikan hasil bumi dan kerajinan seperti beras, sayuran segar, buah-buahan, madu alami, dan bibit tanaman secara adil dan merata lewat pengurangan berulang!";

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(narrationText);
      utterance.lang = 'id-ID';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="game-main-card rounded-3xl shadow-2xl overflow-hidden border-4 border-emerald-600/80">
      {/* 3D Hanging Wooden Game Plaque / Title Signboard */}
      <div className="p-4 sm:p-7 pt-5 sm:pt-6">
        <div className="hanging-chain-pair">
          <div className="hanging-chain"></div>
          <div className="hanging-chain"></div>
        </div>
        <div className="wood-signboard-deluxe rounded-3xl p-6 sm:p-9 text-center relative overflow-hidden transform hover:scale-[1.008] transition-transform duration-300">
          <div className="wood-corner-stud top-3 left-3"></div>
          <div className="wood-corner-stud top-3 right-3"></div>
          <div className="wood-corner-stud bottom-3 left-3"></div>
          <div className="wood-corner-stud bottom-3 right-3"></div>

          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 border-2 border-yellow-400 text-yellow-300 text-xs sm:text-sm px-4 py-1.5 rounded-full font-bold shadow-xl mb-3.5 tracking-wide">
            <span>🏛️</span>
            <span>Situs Sejarah & Lumbung Pangan Desa Pendem, Kota Batu</span>
          </div>

          <h2 className="font-game text-2xl sm:text-4xl md:text-[2.75rem] font-extrabold mb-3 tracking-wider wood-sign-3d-title leading-tight">
            PETUALANGAN BERBAGI DI DESA PENDEM
          </h2>

          <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-500 text-amber-950 font-game font-extrabold text-xs sm:text-sm px-5 py-1.5 rounded-full shadow-lg border-2 border-yellow-100 mb-4 tracking-wide transform hover:scale-105 transition-transform">
            <span>⭐</span>
            <span>Belajar Konsep Pembagian Melalui Pengurangan Berulang</span>
            <span>⭐</span>
          </div>

          <div className="parchment-scroll-deluxe p-4 sm:p-5 max-w-2xl mx-auto shadow-2xl border-2 border-amber-600/70 text-center relative mt-1">
            <div className="inline-flex items-center gap-1.5 bg-red-700 text-yellow-200 text-[11px] sm:text-xs font-game font-bold px-3 py-0.5 rounded-full shadow-md mb-2 border border-yellow-300">
              <span>📜</span> Dekrit Resmi Lumbung Desa
            </div>
            <p className="text-amber-950 text-xs sm:text-base font-bold leading-relaxed px-2 sm:px-4">
              "Mari berpetualang bersama Pak Kades dan warga Desa Pendem! Bantu bagikan hasil panen sayuran, beras, buah manis, madu, dan kerajinan desa secara adil hingga habis tepat menjadi nol!"
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-8 space-y-6 pt-0 sm:pt-0">
        {/* Pak Kades Introduction Card */}
        <div className="bg-amber-50/95 border-2 border-amber-300 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-5 sm:gap-6 shadow-md relative overflow-hidden">
          <div className="relative flex-shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-emerald-100 border-4 border-emerald-600 rounded-full overflow-hidden shadow-lg ring-4 ring-amber-300/60">
              <img
                src="/pak_kades.jpg"
                alt="Pak Kepala Desa"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback if image fails
                  (e.currentTarget as HTMLImageElement).src = '/pak_kades_senang.jpg';
                }}
              />
            </div>
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-amber-600 border border-amber-300 text-white text-[11px] font-game font-bold px-3 py-0.5 rounded-full whitespace-nowrap shadow-md flex items-center gap-1">
              <span>👨‍🌾</span> Pak Kades
            </span>
          </div>

          <div className="flex-grow text-center sm:text-left space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-game font-bold text-amber-950 text-lg sm:text-xl">
                  Pak Wijaya (Kepala Desa)
                </h3>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                  Desa Pendem
                </span>
              </div>
              <button
                onClick={handleSpeak}
                className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-full text-xs flex items-center justify-center shadow transition-transform active:scale-95 cursor-pointer"
                title="Dengarkan Suara"
              >
                <i className="fa-solid fa-volume-high text-sm px-1"></i>
              </button>
            </div>
            <p className="text-gray-800 text-sm sm:text-base leading-relaxed font-medium">
              "{narrationText}"
            </p>
          </div>
        </div>

        {/* 3 Step Mission Guide */}
        <div>
          <h4 className="font-game font-bold text-gray-800 text-base sm:text-lg mb-3 flex items-center">
            <i className="fa-solid fa-compass text-emerald-600 mr-2"></i> 3 Langkah Misi Berbagi:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-emerald-50/90 p-4 rounded-xl border border-emerald-200 flex items-start space-x-3 shadow-sm">
              <span className="bg-emerald-600 text-white font-game font-bold rounded-lg w-7 h-7 flex items-center justify-center flex-shrink-0 text-sm shadow">
                1
              </span>
              <div>
                <h5 className="font-bold text-emerald-900 text-sm">Baca Cerita Warga</h5>
                <p className="text-xs text-gray-600 mt-1">
                  Pahami berapa total benda dan susun kalimat pembagiannya.
                </p>
              </div>
            </div>
            <div className="bg-emerald-50/90 p-4 rounded-xl border border-emerald-200 flex items-start space-x-3 shadow-sm">
              <span className="bg-emerald-600 text-white font-game font-bold rounded-lg w-7 h-7 flex items-center justify-center flex-shrink-0 text-sm shadow">
                2
              </span>
              <div>
                <h5 className="font-bold text-emerald-900 text-sm">Masukkan ke Wadah</h5>
                <p className="text-xs text-gray-600 mt-1">
                  Pindahkan benda ke dalam wadah pengelompokan yang tersedia.
                </p>
              </div>
            </div>
            <div className="bg-emerald-50/90 p-4 rounded-xl border border-emerald-200 flex items-start space-x-3 shadow-sm">
              <span className="bg-emerald-600 text-white font-game font-bold rounded-lg w-7 h-7 flex items-center justify-center flex-shrink-0 text-sm shadow">
                3
              </span>
              <div>
                <h5 className="font-bold text-emerald-900 text-sm">Pengurangan Berulang</h5>
                <p className="text-xs text-gray-600 mt-1">
                  Amati pengurangan hingga sisa benda menjadi tepat 0.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center pt-3">
          <button
            onClick={() => {
              playMenuSelectSound();
              onStart();
            }}
            className="btn-game-primary w-full sm:w-auto text-white font-game text-lg sm:text-xl px-12 py-4 rounded-2xl font-bold flex items-center justify-center gap-2.5 shadow-xl"
          >
            <span>🚀</span> Siap! Mulai Petualangan Berbagi
          </button>
        </div>
      </div>
    </div>
  );
};
