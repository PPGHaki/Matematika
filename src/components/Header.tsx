import React, { useState } from 'react';
import { playMenuSelectSound } from '../audio';

interface HeaderProps {
  score: number;
  currentLevel: number;
  showStats: boolean;
  onGoCover: () => void;
  onGoLevels: () => void;
  onOpenEditor: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  score,
  currentLevel,
  showStats,
  onGoCover,
  onGoLevels,
  onOpenEditor,
}) => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const handleVerifyPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Qwerty01') {
      setShowPasswordModal(false);
      setPassword('');
      setError(false);
      onOpenEditor();
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <>
      <header className="bg-emerald-700/95 backdrop-blur-md text-white shadow-xl sticky top-0 z-40 border-b-4 border-emerald-900">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => {
              playMenuSelectSound();
              onGoCover();
            }}
          >
            <div className="bg-yellow-400 text-emerald-900 p-2 rounded-2xl shadow font-game font-bold text-xl flex items-center justify-center w-10 h-10 border-2 border-white group-hover:scale-105 transition-transform">
              🌾
            </div>
            <div>
              <h1 className="font-game text-lg sm:text-xl font-bold tracking-wide leading-tight drop-shadow-sm">
                Desa Pendem, Batu
              </h1>
              <p className="text-xs text-emerald-200 hidden sm:block">
                Petualangan Berbagi Matematika
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                playMenuSelectSound();
                setShowPasswordModal(true);
              }}
              className="btn-game-amber px-3.5 py-1.5 text-white font-game text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-1.5"
              title="Menu Kelola & Edit Soal"
            >
              <i className="fa-solid fa-lock text-xs text-yellow-200"></i>
              <span>Kelola Soal</span>
            </button>

            {showStats && (
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="bg-emerald-900/90 px-3 py-1.5 rounded-full border-2 border-emerald-500 flex items-center space-x-1.5 shadow-md">
                  <span className="text-yellow-300 text-base">🪙</span>
                  <span className="font-game font-bold text-yellow-300 text-base sm:text-lg">
                    {score}
                  </span>
                </div>
                <div className="bg-emerald-900/90 px-3 py-1.5 rounded-full border-2 border-emerald-500 text-xs font-game text-emerald-100 hidden sm:block shadow-md">
                  Level <span className="font-bold text-white">{currentLevel}</span>
                </div>
                <button
                  onClick={() => {
                    playMenuSelectSound();
                    onGoLevels();
                  }}
                  className="btn-game-amber text-white px-3.5 py-1.5 rounded-xl font-game text-xs sm:text-sm font-semibold flex items-center"
                >
                  <i className="fa-solid fa-list mr-1"></i> Level
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl text-gray-800 border-4 border-amber-500">
            <div className="text-center mb-4">
              <div className="w-14 h-14 bg-amber-100 border-2 border-amber-300 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-bold shadow-sm">
                🔐
              </div>
              <h3 className="text-lg font-bold text-gray-900 font-game">
                Akses Kelola Soal
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                Masukkan kata sandi guru/admin untuk mengelola soal.
              </p>
            </div>
            <form onSubmit={handleVerifyPassword} className="space-y-4">
              <div>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(false);
                    }}
                    placeholder="Masukkan sandi..."
                    className="w-full pl-4 pr-11 py-2.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:outline-none text-sm transition"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-gray-500 hover:text-amber-700 p-1"
                    title={showPassword ? 'Sembunyikan sandi' : 'Lihat sandi'}
                  >
                    <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
                {error && (
                  <p className="text-xs text-red-600 mt-1.5 font-bold text-center">
                    ⚠️ Sandi salah! Coba lagi (petunjuk: Qwerty01).
                  </p>
                )}
              </div>
              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPassword('');
                    setError(false);
                  }}
                  className="btn-game-secondary w-1/2 py-2.5 rounded-xl font-bold text-xs sm:text-sm"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-game-amber w-1/2 py-2.5 text-white rounded-xl font-bold text-xs sm:text-sm"
                >
                  Masuk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
