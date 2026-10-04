import React, { useState } from 'react';
import { Question, LevelNumber } from '../types';
import { defaultQuestionBank } from '../questions';
import { playMenuSelectSound } from '../audio';
import { ItemIcon, resolveItemKey } from './ItemIcon';

interface EditorModalProps {
  questionBank: Record<LevelNumber, Question[]>;
  onUpdateQuestionBank: (newBank: Record<LevelNumber, Question[]>) => void;
  onClose: () => void;
}

export const EditorModal: React.FC<EditorModalProps> = ({
  questionBank,
  onUpdateQuestionBank,
  onClose,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<LevelNumber>(1);
  const [editIndex, setEditIndex] = useState<number>(-1);
  const [showFormModal, setShowFormModal] = useState<boolean>(false);

  // Form states
  const [formLevel, setFormLevel] = useState<LevelNumber>(1);
  const [formType, setFormType] = useState<Question['type']>('Bentuk Angka');
  const [formTitle, setFormTitle] = useState('');
  const [formEmoji, setFormEmoji] = useState('🌾');
  const [formItemKey, setFormItemKey] = useState('beras');
  const [formText, setFormText] = useState('');
  const [formTotal, setFormTotal] = useState(6);
  const [formGroupSize, setFormGroupSize] = useState(2);
  const [formReserve, setFormReserve] = useState(0);

  const villageItems: Array<{ key: string; label: string; emoji: string }> = [
    { key: 'sayur', label: 'Sayur', emoji: '🥬' },
    { key: 'buah', label: 'Buah', emoji: '🍎' },
    { key: 'telur', label: 'Telur', emoji: '🥚' },
    { key: 'beras', label: 'Beras', emoji: '🌾' },
    { key: 'ikan', label: 'Ikan', emoji: '🐟' },
    { key: 'kayu', label: 'Kayu', emoji: '🪵' },
    { key: 'bibit', label: 'Bibit', emoji: '🌱' },
    { key: 'madu', label: 'Madu', emoji: '🍯' },
    { key: 'susu', label: 'Susu', emoji: '🥛' },
  ];

  const handleOpenAdd = () => {
    playMenuSelectSound();
    setEditIndex(-1);
    setFormLevel(selectedLevel);
    setFormType(selectedLevel === 4 ? 'Soal HOTS 2-Langkah' : 'Bentuk Angka');
    setFormTitle(`Soal ${(questionBank[selectedLevel]?.length || 0) + 1}: `);
    setFormEmoji('🌾');
    setFormItemKey('beras');
    setFormText('');
    setFormTotal(12);
    setFormGroupSize(3);
    setFormReserve(selectedLevel === 4 ? 1 : 0);
    setShowFormModal(true);
  };

  const handleOpenEdit = (index: number) => {
    playMenuSelectSound();
    const q = questionBank[selectedLevel][index];
    if (!q) return;
    setEditIndex(index);
    setFormLevel(selectedLevel);
    setFormType(q.type);
    setFormTitle(q.title);
    setFormEmoji(q.emoji || '🌾');
    setFormItemKey(q.itemKey || resolveItemKey(undefined, q.emoji));
    setFormText(q.text);
    setFormTotal(q.total);
    setFormGroupSize(q.groupSize);
    setFormReserve(q.reserve || 0);
    setShowFormModal(true);
  };

  const handleDelete = (index: number) => {
    playMenuSelectSound();
    const q = questionBank[selectedLevel][index];
    if (!window.confirm(`Yakin ingin menghapus "${q.title}"?`)) return;
    const updated = { ...questionBank };
    updated[selectedLevel] = updated[selectedLevel].filter((_, i) => i !== index);
    onUpdateQuestionBank(updated);
  };

  const handleResetDefaults = () => {
    playMenuSelectSound();
    if (window.confirm('Apakah kamu yakin ingin mengembalikan semua soal ke set bawaan asli Desa Pendem?')) {
      onUpdateQuestionBank(JSON.parse(JSON.stringify(defaultQuestionBank)));
    }
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (formGroupSize <= 0) {
      alert('Isi tiap wadah harus lebih dari 0!');
      return;
    }
    const isHots = formType === 'Soal HOTS 2-Langkah' || formLevel === 4;
    const actualTotal = isHots ? formTotal + formReserve : formTotal;

    const newQ: Question = {
      title: formTitle.trim(),
      type: formType,
      emoji: formEmoji.trim() || '🌾',
      itemKey: formItemKey,
      total: formTotal,
      groupSize: formGroupSize,
      text: formText.trim(),
      hots: isHots,
      reserve: isHots ? formReserve : 0,
      actualTotal: isHots ? actualTotal : formTotal,
    };

    const updated = { ...questionBank };
    const list = [...(updated[formLevel] || [])];

    if (editIndex >= 0 && formLevel === selectedLevel) {
      list[editIndex] = newQ;
      updated[formLevel] = list;
    } else {
      updated[formLevel] = [...(updated[formLevel] || []), newQ];
    }

    onUpdateQuestionBank(updated);
    setShowFormModal(false);
  };

  const currentQuestions = questionBank[selectedLevel] || [];

  return (
    <div className="game-main-card rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full font-game">
              🛠️ Menu Editor
            </span>
            <h2 className="font-game text-2xl sm:text-3xl font-extrabold text-teal-900">
              Kelola & Tambah Soal
            </h2>
          </div>
          <p className="text-gray-600 text-xs sm:text-sm mt-1">
            Tambah, edit, atau sesuaikan soal matematika untuk setiap tingkatan lingkungan.
          </p>
        </div>
        <div className="flex items-center space-x-2.5">
          <button
            onClick={handleOpenAdd}
            className="btn-game-primary text-white font-game text-xs sm:text-sm px-4 py-2.5 rounded-xl font-bold flex items-center space-x-1.5"
          >
            <i className="fa-solid fa-plus"></i>
            <span>Tambah Soal</span>
          </button>
          <button
            onClick={handleResetDefaults}
            className="btn-game-rose text-white font-game text-xs sm:text-sm px-3.5 py-2.5 rounded-xl font-bold flex items-center gap-1"
            title="Kembalikan Soal ke Bawaan"
          >
            <i className="fa-solid fa-rotate-left"></i> Reset
          </button>
        </div>
      </div>

      {/* Level Tabs */}
      <div className="flex flex-wrap gap-2.5 border-b border-gray-200 pb-3">
        {([1, 2, 3, 4] as LevelNumber[]).map((lvl) => {
          const names = ['RT', 'RW', 'Desa', 'Kelurahan'];
          const active = selectedLevel === lvl;
          return (
            <button
              key={lvl}
              onClick={() => {
                playMenuSelectSound();
                setSelectedLevel(lvl);
              }}
              className={`px-4 py-2.5 rounded-xl font-game font-bold text-xs sm:text-sm transition cursor-pointer ${
                active
                  ? 'bg-teal-700 text-white shadow-md border-b-2 border-teal-900'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              Level {lvl} (Lingkungan {names[lvl - 1]})
            </button>
          );
        })}
      </div>

      {/* Question List */}
      <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
        {currentQuestions.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400">
            <i className="fa-solid fa-folder-open text-3xl mb-2"></i>
            <p className="font-game text-sm font-semibold">Belum ada soal pada level ini</p>
            <button
              onClick={handleOpenAdd}
              className="mt-2 text-teal-600 font-bold text-xs underline cursor-pointer"
            >
              + Tambah Soal Pertama
            </button>
          </div>
        ) : (
          currentQuestions.map((q, idx) => (
            <div
              key={idx}
              className="bg-teal-50/80 border-2 border-teal-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-teal-400 transition shadow-sm"
            >
              <div className="flex items-start space-x-3 flex-grow">
                <div className="w-12 h-12 bg-white rounded-xl border border-teal-300 flex items-center justify-center p-1.5 flex-shrink-0 shadow-xs">
                  <ItemIcon itemKey={q.itemKey} nameOrEmoji={q.emoji} className="w-full h-full" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-game font-bold text-teal-900 text-sm sm:text-base">
                      {q.title}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        q.hots ? 'bg-rose-200 text-rose-800' : 'bg-emerald-200 text-emerald-800'
                      }`}
                    >
                      {q.type}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">{q.text}</p>
                  <div className="text-[11px] font-semibold text-teal-700 mt-1 flex items-center gap-3">
                    <span>Total Benda: <strong>{q.hots ? (q.actualTotal || q.total + (q.reserve || 0)) : q.total}</strong></span>
                    <span>Isi Wadah: <strong>{q.groupSize}</strong></span>
                    {q.hots && <span>Disisihkan: <strong>{q.reserve}</strong></span>}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 w-full sm:w-auto justify-end flex-shrink-0">
                <button
                  onClick={() => handleOpenEdit(idx)}
                  className="btn-game-amber text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center space-x-1"
                >
                  <i className="fa-solid fa-pen text-[11px]"></i>
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(idx)}
                  className="btn-game-rose text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center space-x-1"
                >
                  <i className="fa-solid fa-trash text-[11px]"></i>
                  <span>Hapus</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
        <button
          onClick={() => {
            playMenuSelectSound();
            onClose();
          }}
          className="btn-game-secondary px-5 py-2.5 rounded-xl font-game text-xs sm:text-sm font-bold flex items-center gap-1.5"
        >
          <i className="fa-solid fa-arrow-left"></i> Kembali
        </button>
      </div>

      {/* Question Form Modal */}
      {showFormModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border-4 border-teal-600 max-w-xl w-full p-6 shadow-2xl space-y-4 my-8">
            <div className="flex justify-between items-center border-b pb-3 border-gray-200">
              <h3 className="font-game text-xl font-bold text-teal-900">
                {editIndex >= 0 ? 'Edit Soal' : 'Tambah Soal Baru'}
              </h3>
              <button
                onClick={() => setShowFormModal(false)}
                className="text-gray-400 hover:text-gray-600 text-lg p-1 cursor-pointer"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <form onSubmit={handleSaveForm} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Tingkat Level / Lingkungan
                  </label>
                  <select
                    value={formLevel}
                    onChange={(e) => {
                      const lvl = parseInt(e.target.value) as LevelNumber;
                      setFormLevel(lvl);
                      if (lvl === 4) setFormType('Soal HOTS 2-Langkah');
                    }}
                    className="w-full bg-emerald-50 border border-emerald-300 rounded-xl p-2.5 text-xs font-bold text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value={1}>Level 1: Lingkungan RT</option>
                    <option value={2}>Level 2: Lingkungan RW</option>
                    <option value={3}>Level 3: Lingkungan Desa</option>
                    <option value={4}>Level 4: Lingkungan Kelurahan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Tipe Soal</label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value as Question['type'])}
                    className="w-full bg-emerald-50 border border-emerald-300 rounded-xl p-2.5 text-xs font-bold text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Bentuk Angka">Bentuk Angka (Jawaban Langsung)</option>
                    <option value="Soal Cerita">Soal Cerita (Isi Kalimat Pembagian)</option>
                    <option value="Soal HOTS 2-Langkah">Soal HOTS 2-Langkah (Disisihkan)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 mb-1">Judul Soal</label>
                    <input
                      type="text"
                      required
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder="Contoh: Soal 1: Panen Apel"
                      className="w-full border border-gray-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Komponen Benda</label>
                    <div className="flex items-center gap-2">
                      <select
                        value={formItemKey}
                        onChange={(e) => {
                          const k = e.target.value;
                          setFormItemKey(k);
                          const itm = villageItems.find((v) => v.key === k);
                          if (itm) setFormEmoji(itm.emoji);
                        }}
                        className="w-full border-2 border-emerald-400 bg-emerald-50/50 rounded-xl p-2 text-xs font-bold text-emerald-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      >
                        {villageItems.map((it) => (
                          <option key={it.key} value={it.key}>
                            {it.label} ({it.emoji})
                          </option>
                        ))}
                      </select>
                      <div className="w-12 h-12 flex-shrink-0 bg-white border-2 border-amber-300 rounded-xl flex items-center justify-center p-1 shadow-xs">
                        <ItemIcon itemKey={formItemKey} nameOrEmoji={formEmoji} className="w-full h-full" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Village Item Component Selector */}
                <div className="bg-emerald-50/90 border border-emerald-300 rounded-2xl p-3 space-y-2">
                  <div className="flex justify-between items-center text-[11px] font-bold text-emerald-950">
                    <span className="flex items-center gap-1.5">
                      <span>🌾</span> Pilih Komponen Item / Bahan Desa Pendem:
                    </span>
                    <span className="text-[10px] text-gray-500 font-normal">Klik untuk memilih</span>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {villageItems.map((item) => {
                      const isSelected = formItemKey === item.key;
                      return (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => {
                            setFormItemKey(item.key);
                            setFormEmoji(item.emoji);
                          }}
                          className={`p-2 rounded-xl border-2 flex flex-col items-center justify-center transition cursor-pointer ${
                            isSelected
                              ? 'bg-amber-100 border-amber-500 shadow-md ring-2 ring-amber-300 scale-105'
                              : 'bg-white border-gray-200 hover:border-emerald-400 hover:bg-emerald-50'
                          }`}
                        >
                          <div className="w-9 h-9 flex items-center justify-center">
                            <ItemIcon itemKey={item.key} nameOrEmoji={item.emoji} className="w-full h-full" />
                          </div>
                          <span className="text-[11px] font-bold text-gray-800 mt-1">
                            {item.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Naskah Soal / Cerita</label>
                <textarea
                  required
                  rows={3}
                  value={formText}
                  onChange={(e) => setFormText(e.target.value)}
                  placeholder="Tuliskan cerita soal di sini..."
                  className="w-full border border-gray-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-amber-50 p-3 rounded-2xl border border-amber-200">
                <div>
                  <label className="block text-[11px] font-bold text-amber-900 mb-1">
                    Total Benda Dibagikan
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={100}
                    value={formTotal}
                    onChange={(e) => setFormTotal(parseInt(e.target.value) || 1)}
                    className="w-full border border-amber-300 rounded-xl p-2 text-xs font-bold text-center focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-amber-900 mb-1">
                    Isi Tiap Wadah (Ukuran Grup)
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={20}
                    value={formGroupSize}
                    onChange={(e) => setFormGroupSize(parseInt(e.target.value) || 1)}
                    className="w-full border border-amber-300 rounded-xl p-2 text-xs font-bold text-center focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                {(formType === 'Soal HOTS 2-Langkah' || formLevel === 4) && (
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[11px] font-bold text-rose-900 mb-1">
                      Disisihkan (HOTS)
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={20}
                      value={formReserve}
                      onChange={(e) => setFormReserve(parseInt(e.target.value) || 0)}
                      className="w-full border border-rose-300 rounded-xl p-2 text-xs font-bold text-center bg-rose-50 text-rose-900 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                    />
                  </div>
                )}
              </div>

              <div className="pt-2 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowFormModal(false)}
                  className="btn-game-secondary font-game text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-game-primary text-white font-game text-xs font-bold px-6 py-2.5 rounded-xl cursor-pointer shadow-md"
                >
                  Simpan Soal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
