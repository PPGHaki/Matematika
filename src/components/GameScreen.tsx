import React, { useState, useEffect } from 'react';
import { Question, LevelNumber, ContainerGroup } from '../types';
import { ItemIcon } from './ItemIcon';
import {
  playItemClickSound,
  playCheckClickSound,
  playCorrectSound,
  playWrongSound,
  playMenuSelectSound,
} from '../audio';

interface GameScreenProps {
  level: LevelNumber;
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  score: number;
  onUpdateScore: (newScore: number) => void;
  onQuestionCompleted: (isCorrect: boolean, tipSpent: number) => void;
  onNextQuestion: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  level,
  question,
  questionIndex,
  totalQuestions,
  score,
  onUpdateScore,
  onQuestionCompleted,
  onNextQuestion,
}) => {
  const [itemsLeft, setItemsLeft] = useState<number>(question.total);
  const [reservedItems, setReservedItems] = useState<string[]>([]);
  const [containers, setContainers] = useState<ContainerGroup[]>([
    { capacity: question.groupSize, items: [] },
  ]);
  const [activeContainerIndex, setActiveContainerIndex] = useState<number>(0);

  // Math inputs
  const [numberResult, setNumberResult] = useState<string>('');
  const [storyTotal, setStoryTotal] = useState<string>('');
  const [storySize, setStorySize] = useState<string>('');
  const [storyResult, setStoryResult] = useState<string>('');

  // Hints and feedback
  const [hintUnlocked, setHintUnlocked] = useState<boolean>(false);
  const [hintMessage, setHintMessage] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<{ title: string; text: string; icon: string } | null>(null);

  // Initialize or reset question state when question changes
  useEffect(() => {
    const isHots = question.hots && (question.reserve || 0) > 0;
    const initialItems = isHots ? (question.actualTotal || question.total + (question.reserve || 0)) : question.total;

    setItemsLeft(initialItems);
    setReservedItems([]);
    setContainers([{ capacity: question.groupSize, items: [] }]);
    setActiveContainerIndex(0);

    setNumberResult('');
    setStoryTotal('');
    setStorySize('');
    setStoryResult('');

    setHintUnlocked(false);
    setHintMessage('');
    setShowFeedback(false);
    setAlertMessage(null);
  }, [question]);

  // Click on item on the main table to move to active container
  const handleMoveToContainer = () => {
    if (itemsLeft <= 0) return;
    playItemClickSound();

    let targetIndex = activeContainerIndex;
    let target = containers[targetIndex];

    if (!target || target.items.length >= target.capacity) {
      if (level === 1) {
        // Auto-add container in Level 1
        const newContainers = [...containers, { capacity: question.groupSize, items: [question.emoji] }];
        setContainers(newContainers);
        setActiveContainerIndex(newContainers.length - 1);
        setItemsLeft((prev) => prev - 1);
        return;
      } else {
        // Find next open container
        const openIdx = containers.findIndex((c) => c.items.length < c.capacity);
        if (openIdx !== -1) {
          targetIndex = openIdx;
          setActiveContainerIndex(openIdx);
        } else {
          setAlertMessage({
            title: 'Wadah Aktif Penuh',
            text: 'Wadah ini sudah penuh! Klik tombol "+ Wadah Baru" untuk menambah wadah pengelompokan.',
            icon: '📦',
          });
          return;
        }
      }
    }

    setContainers((prev) => {
      const copy = [...prev];
      copy[targetIndex] = {
        ...copy[targetIndex],
        items: [...copy[targetIndex].items, question.emoji],
      };
      return copy;
    });
    setItemsLeft((prev) => prev - 1);
  };

  // Move item from container back to table
  const handleRemoveFromContainer = (cIdx: number, itemIdx: number) => {
    playItemClickSound();
    setContainers((prev) => {
      const copy = [...prev];
      const items = [...copy[cIdx].items];
      items.splice(itemIdx, 1);
      copy[cIdx] = { ...copy[cIdx], items };
      return copy;
    });
    setItemsLeft((prev) => prev + 1);
  };

  // Reserve item (HOTS)
  const handleMoveToReserve = () => {
    if (itemsLeft <= 0) {
      setAlertMessage({
        title: 'Meja Kosong',
        text: 'Tidak ada benda tersisa di Meja Utama untuk disisihkan!',
        icon: '⚠️',
      });
      return;
    }
    playItemClickSound();
    setItemsLeft((prev) => prev - 1);
    setReservedItems((prev) => [...prev, question.emoji]);
  };

  const handleReturnFromReserve = (idx: number) => {
    playItemClickSound();
    setReservedItems((prev) => {
      const copy = [...prev];
      copy.splice(idx, 1);
      return copy;
    });
    setItemsLeft((prev) => prev + 1);
  };

  // Add new container
  const handleAddNewContainer = () => {
    playMenuSelectSound();
    setContainers((prev) => [...prev, { capacity: question.groupSize, items: [] }]);
    setActiveContainerIndex(containers.length);
  };

  // Delete container
  const handleDeleteContainer = (cIdx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (containers.length <= 1) {
      setAlertMessage({
        title: 'Peringatan',
        text: 'Harus ada minimal 1 wadah di area pengelompokan!',
        icon: '⚠️',
      });
      return;
    }
    playItemClickSound();
    const removedItemsCount = containers[cIdx].items.length;
    setItemsLeft((prev) => prev + 1 * removedItemsCount);

    setContainers((prev) => prev.filter((_, i) => i !== cIdx));
    setActiveContainerIndex((prev) => Math.max(0, prev >= cIdx ? prev - 1 : prev));
  };

  // Subtraction expression string
  const fullContainersCount = containers.filter((c) => c.items.length === question.groupSize).length;
  let subExpression = `${question.total}`;
  if (fullContainersCount === 0) {
    subExpression = `${question.total} = ${question.total}`;
  } else {
    for (let i = 0; i < fullContainersCount; i++) {
      subExpression += ` - ${question.groupSize}`;
    }
    const currentRem = question.total - fullContainersCount * question.groupSize;
    subExpression += ` = ${currentRem}`;
  }

  // Use hint
  const handleUseHint = () => {
    playMenuSelectSound();
    if (hintUnlocked) {
      setAlertMessage({
        title: 'Tips Sudah Terbuka',
        text: 'Petunjuk pengerjaan sudah ditampilkan pada kotak kuning di bawah soal!',
        icon: '💡',
      });
      return;
    }
    if (score < 20) {
      setAlertMessage({
        title: 'Poin Tidak Cukup',
        text: `Poin kamu saat ini (${score} Poin) belum cukup. Butuh minimal 20 Poin untuk membuka Tips!`,
        icon: '🪙',
      });
      return;
    }

    onUpdateScore(score - 20);
    setHintUnlocked(true);

    let msg = '';
    if (question.hots) {
      msg = `Langkah 1: Sisihkan ${question.reserve} benda dari Meja Utama ke Area Cadangan.\nLangkah 2: Kelompokkan sisa benda di meja ke dalam wadah (masing-masing diisi ${question.groupSize} benda) hingga sisa benda habis (0).\nLangkah 3: Hitung berapa wadah yang berhasil terisi penuh!`;
    } else if (question.type === 'Bentuk Angka') {
      msg = `Pindahkan benda dari Meja Utama ke dalam wadah masing-masing sebanyak ${question.groupSize} benda hingga meja menjadi kosong (0).\nBanyaknya wadah yang terisi penuh adalah hasil pembagian yang kamu cari!`;
    } else {
      msg = `1. Temukan total awal benda dari cerita (${question.total}) dan isi per wadah (${question.groupSize}).\n2. Kelompokkan benda di meja ke wadah masing-masing berisi ${question.groupSize} benda.\n3. Susun kalimat pembagiannya: [ ${question.total} ] ÷ [ ${question.groupSize} ] = [ Hitung Wadah Terisi ].`;
    }
    setHintMessage(msg);
  };

  // Check answer
  const handleCheckAnswer = () => {
    playCheckClickSound();

    // 1. Validate Math input
    if (question.type === 'Bentuk Angka') {
      const val = parseInt(numberResult);
      const expected = question.total / question.groupSize;
      if (isNaN(val) || val !== expected) {
        playWrongSound();
        onQuestionCompleted(false, 0);
        setAlertMessage({
          title: 'Jawaban Pembagian Salah',
          text: 'Hasil pembagian yang kamu masukkan belum tepat. Coba periksa kembali hasil baginya!',
          icon: '❌',
        });
        return;
      }
    } else {
      const tot = parseInt(storyTotal);
      const sz = parseInt(storySize);
      const res = parseInt(storyResult);
      const expectedTotal = question.total;
      const expectedSize = question.groupSize;
      const expectedRes = expectedTotal / expectedSize;

      if (isNaN(tot) || isNaN(sz) || isNaN(res) || tot !== expectedTotal || sz !== expectedSize || res !== expectedRes) {
        playWrongSound();
        onQuestionCompleted(false, 0);
        setAlertMessage({
          title: 'Kalimat Pembagian Salah',
          text: 'Kalimat pembagian yang kamu tulis belum sesuai dengan cerita. Periksa kembali angka total, isi per wadah, dan hasilnya!',
          icon: '❌',
        });
        return;
      }
    }

    // 2. Check remaining items on table
    if (itemsLeft > 0) {
      playWrongSound();
      setAlertMessage({
        title: 'Pemeriksaan Belum Selesai',
        text: `Masih ada ${itemsLeft} benda di meja utama! Kelompokkan seluruh benda ke dalam wadah terlebih dahulu.`,
        icon: '⚠️',
      });
      return;
    }

    // 3. Check HOTS Reserve
    if (question.hots && (question.reserve || 0) > 0) {
      if (reservedItems.length !== question.reserve) {
        playWrongSound();
        setAlertMessage({
          title: 'Benda Disisihkan Belum Sesuai',
          text: `Jumlah benda di Area Cadangan (${reservedItems.length}) tidak sesuai dengan cerita (seharusnya ${question.reserve} benda disisihkan).`,
          icon: '⚠️',
        });
        return;
      }
    }

    // 4. Check Containers capacity
    if (containers.length === 0) {
      playWrongSound();
      setAlertMessage({
        title: 'Wadah Kosong',
        text: 'Belum ada wadah yang diisi!',
        icon: '⚠️',
      });
      return;
    }

    for (let i = 0; i < containers.length; i++) {
      if (containers[i].items.length !== question.groupSize) {
        playWrongSound();
        setAlertMessage({
          title: 'Pengelompokan Belum Pas',
          text: `Wadah ${i + 1} berisi ${containers[i].items.length} benda (seharusnya tepat ${question.groupSize} benda per wadah).`,
          icon: '⚠️',
        });
        return;
      }
    }

    // All correct!
    playCorrectSound();
    onUpdateScore(score + 20);
    onQuestionCompleted(true, hintUnlocked ? 20 : 0);
    setShowFeedback(true);
  };

  const handleResetQuestion = () => {
    playMenuSelectSound();
    const isHots = question.hots && (question.reserve || 0) > 0;
    const initialItems = isHots ? (question.actualTotal || question.total + (question.reserve || 0)) : question.total;
    setItemsLeft(initialItems);
    setReservedItems([]);
    setContainers([{ capacity: question.groupSize, items: [] }]);
    setActiveContainerIndex(0);
    setNumberResult('');
    setStoryTotal('');
    setStorySize('');
    setStoryResult('');
    setShowFeedback(false);
  };

  return (
    <div className="space-y-4">
      {/* Header & Progress Bar */}
      <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-md border-2 border-emerald-400 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full font-game shadow-xs">
            Soal {questionIndex + 1}/{totalQuestions}
          </span>
          <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full font-game shadow-xs">
            {question.type}
          </span>
        </div>

        <div className="w-full sm:w-64 bg-gray-200/90 h-3 rounded-full overflow-hidden shadow-inner">
          <div
            className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full transition-all duration-300"
            style={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Story & Expression Card */}
      <div className="bg-amber-50/90 backdrop-blur-md border-2 border-amber-300 p-5 rounded-2xl shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4">
          <div className="flex items-start space-x-4 flex-grow">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white p-2 rounded-2xl shadow-md border-2 border-amber-300 flex-shrink-0 flex items-center justify-center">
              <ItemIcon itemKey={question.itemKey} nameOrEmoji={question.emoji} className="w-full h-full" />
            </div>
            <div className="flex-grow space-y-1">
              <h3 className="font-game font-bold text-amber-900 text-base sm:text-lg">
                {question.title}
              </h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                {question.text}
              </p>
            </div>
          </div>

          {/* Division Math Input for "Bentuk Angka" */}
          {question.type === 'Bentuk Angka' && (
            <div className="w-full md:w-auto flex-shrink-0 bg-emerald-700 text-white border-2 border-emerald-800 p-3.5 rounded-2xl shadow-md text-center flex flex-col items-center justify-center min-w-[170px]">
              <span className="text-[11px] font-bold text-emerald-200 uppercase tracking-wider flex items-center gap-1">
                <i className="fa-solid fa-calculator text-amber-300"></i> Soal Pembagian
              </span>
              <div className="font-game font-extrabold text-xl sm:text-2xl text-yellow-300 mt-1 tracking-wide flex items-center justify-center gap-1.5">
                <span>{question.total}</span>
                <span>÷</span>
                <span>{question.groupSize}</span>
                <span>=</span>
                <input
                  type="number"
                  value={numberResult}
                  onChange={(e) => setNumberResult(e.target.value)}
                  placeholder="?"
                  className="w-12 h-9 text-center bg-white text-emerald-900 border-2 border-yellow-400 rounded-lg text-lg font-bold shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-300"
                />
              </div>
              <div className="text-[11px] font-bold mt-1 text-emerald-200">
                {numberResult !== ''
                  ? parseInt(numberResult) === question.total / question.groupSize
                    ? '✨ Jawaban Tepat!'
                    : 'Periksa kembali'
                  : 'Ketik hasil pembagian'}
              </div>
            </div>
          )}
        </div>

        {/* HOTS banner */}
        {question.hots && (question.reserve || 0) > 0 && (
          <div className="mt-4 bg-rose-100 border border-rose-300 p-2.5 rounded-xl text-xs text-rose-900 font-semibold flex items-center shadow-xs">
            <i className="fa-solid fa-lightbulb text-rose-600 mr-2 text-base"></i>
            <span>
              Langkah 1: Baca cerita dan sisihkan {question.reserve} benda cadangan ke Area Cadangan!
            </span>
          </div>
        )}

        {/* Hint Box */}
        {hintUnlocked && (
          <div className="mt-3 bg-amber-100 border-2 border-amber-400 p-3.5 rounded-xl text-xs sm:text-sm text-amber-950 font-medium flex items-start space-x-3 shadow-xs">
            <span className="text-2xl flex-shrink-0">💡</span>
            <div>
              <span className="font-bold font-game text-amber-900 block text-sm">Tips Pengerjaan:</span>
              <span className="leading-relaxed whitespace-pre-line">{hintMessage}</span>
            </div>
          </div>
        )}
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* LEFT: Items Table & Reserve Box */}
        <div className="lg:col-span-5 bg-white/85 backdrop-blur-md p-5 rounded-2xl shadow-md border-2 border-emerald-400 flex flex-col justify-between min-h-[320px]">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-game font-bold text-gray-800 text-sm sm:text-base flex items-center">
                🏠 Meja Utama (Sisa Benda)
              </h4>
              <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-lg font-bold shadow-xs">
                Sisa: <span className="text-sm font-extrabold">{itemsLeft}</span>
              </span>
            </div>
            <p className="text-xs text-gray-600 mb-3 font-medium">
              Klik benda di bawah ini untuk memasukkannya ke wadah aktif.
            </p>

            <div className="flex flex-wrap gap-2.5 justify-center sm:justify-start max-h-[220px] overflow-y-auto p-2 bg-emerald-50/90 rounded-xl border border-emerald-200 min-h-[110px]">
              {Array.from({ length: itemsLeft }).map((_, i) => (
                <div
                  key={i}
                  onClick={handleMoveToContainer}
                  className="item-card w-13 h-13 sm:w-14 sm:h-14 bg-white/95 border-2 border-emerald-500 rounded-2xl flex items-center justify-center p-1.5 shadow-md hover:shadow-lg cursor-pointer select-none ring-2 ring-emerald-200/70"
                  title="Klik untuk memasukkan ke wadah"
                >
                  <ItemIcon itemKey={question.itemKey} nameOrEmoji={question.emoji} className="w-full h-full" />
                </div>
              ))}
              {itemsLeft === 0 && (
                <div className="w-full text-center text-xs text-emerald-700 font-bold py-6 italic">
                  Semua benda di meja utama telah dipindahkan!
                </div>
              )}
            </div>
          </div>

          {/* HOTS Interactive Reserve Box */}
          {question.hots && (question.reserve || 0) > 0 && (
            <div className="mt-3 pt-3 border-t border-rose-200">
              <div className="bg-rose-50/90 border-2 border-rose-300 p-3 rounded-xl shadow-xs">
                <div className="flex justify-between items-center mb-2">
                  <h5 className="font-game font-bold text-rose-900 text-xs flex items-center">
                    📦 Area Cadangan / Pajangan
                  </h5>
                  <span className="text-[11px] font-bold text-rose-700 bg-rose-200 px-2 py-0.5 rounded-md">
                    {reservedItems.length} Benda
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleMoveToReserve}
                    className="btn-game-rose font-game text-xs py-2 px-3.5 rounded-xl font-bold flex-shrink-0 flex items-center gap-1"
                  >
                    <span>➕</span> Sisihkan 1 Benda
                  </button>
                  <div className="flex flex-wrap gap-1.5 items-center bg-white p-1.5 rounded-lg border border-rose-200 min-h-[40px] flex-grow shadow-inner">
                    {reservedItems.length === 0 ? (
                      <span className="text-[11px] text-rose-400 italic px-2">
                        Belum ada benda disisihkan
                      </span>
                    ) : (
                      reservedItems.map((em, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleReturnFromReserve(idx)}
                          className="w-10 h-10 sm:w-11 sm:h-11 bg-white border-2 border-rose-400 rounded-xl flex items-center justify-center p-1 cursor-pointer hover:bg-rose-100 transition shadow-xs active:scale-90"
                          title="Klik untuk kembalikan ke meja utama"
                        >
                          <ItemIcon itemKey={question.itemKey} nameOrEmoji={em} className="w-full h-full" />
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Container Grouping Area & Math Expression */}
        <div className="lg:col-span-7 bg-white/85 backdrop-blur-md p-5 rounded-2xl shadow-md border-2 border-emerald-400 flex flex-col justify-between min-h-[320px]">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-game font-bold text-gray-800 text-sm sm:text-base flex items-center">
                🧺 Area Wadah Pengelompokan
              </h4>
              <div className="flex items-center space-x-2">
                {level > 1 && (
                  <button
                    onClick={handleAddNewContainer}
                    className="btn-game-primary text-white text-xs font-bold px-3.5 py-1.5 rounded-xl font-game shadow-md"
                  >
                    + Wadah Baru
                  </button>
                )}
                <span className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded-lg font-bold shadow-xs">
                  Wadah: <span className="text-sm font-extrabold">{containers.length}</span>
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 max-h-[200px] overflow-y-auto p-2 bg-slate-50/90 rounded-xl border border-slate-200 min-h-[140px] items-start">
              {containers.map((c, cIdx) => {
                const isActive = cIdx === activeContainerIndex;
                return (
                  <div
                    key={cIdx}
                    onClick={() => setActiveContainerIndex(cIdx)}
                    className={`p-3 rounded-2xl border-2 transition relative flex flex-col justify-between min-w-[130px] sm:min-w-[145px] cursor-pointer ${
                      isActive
                        ? 'border-emerald-600 bg-emerald-50/95 shadow-md ring-2 ring-emerald-400'
                        : 'border-gray-300 bg-white/95 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-game text-xs font-bold text-gray-700">
                        Wadah {cIdx + 1}
                      </span>
                      {containers.length > 1 && (
                        <button
                          onClick={(e) => handleDeleteContainer(cIdx, e)}
                          className="text-rose-500 hover:text-rose-700 hover:bg-rose-100 p-1 rounded-md text-xs transition cursor-pointer"
                          title="Hapus wadah ini"
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5 min-h-[46px] items-center">
                      {c.items.length === 0 ? (
                        <span className="text-xs text-gray-400 italic py-1 px-1">
                          Wadah kosong
                        </span>
                      ) : (
                        c.items.map((em, itemIdx) => (
                          <div
                            key={itemIdx}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveFromContainer(cIdx, itemIdx);
                            }}
                            className="w-10 h-10 sm:w-11 sm:h-11 bg-white border-2 border-emerald-400 rounded-xl flex items-center justify-center p-1 shadow-xs cursor-pointer hover:bg-rose-50 hover:border-rose-400 transition active:scale-90"
                            title="Klik untuk kembalikan ke meja"
                          >
                            <ItemIcon itemKey={question.itemKey} nameOrEmoji={em} className="w-full h-full" />
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Subtraction Formula Visualizer & Controls */}
          <div className="mt-4 pt-3 border-t border-gray-200 space-y-3">
            <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-xl text-center space-y-1 shadow-xs">
              <p className="text-xs text-amber-800 font-semibold">Proses Pengurangan Berulang:</p>
              <div className="font-game font-bold text-emerald-800 text-xs sm:text-base tracking-wider leading-relaxed">
                {subExpression}
              </div>
            </div>

            {/* Story Math Input for Story and HOTS */}
            {question.type !== 'Bentuk Angka' && (
              <div className="bg-amber-50 border-2 border-amber-400 p-3 rounded-xl shadow-xs text-center flex flex-col items-center justify-center">
                <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1 mb-1">
                  ✍️ Tulis Kalimat Pembagian
                </span>
                <div className="flex items-center justify-center gap-1.5 font-game font-extrabold text-lg text-emerald-800 my-1">
                  <input
                    type="number"
                    value={storyTotal}
                    onChange={(e) => setStoryTotal(e.target.value)}
                    placeholder="Total"
                    className="w-16 h-10 text-center bg-white border-2 border-amber-300 rounded-xl focus:border-emerald-600 focus:outline-none font-bold text-sm shadow-inner"
                  />
                  <span className="text-xl text-amber-800 font-bold">÷</span>
                  <input
                    type="number"
                    value={storySize}
                    onChange={(e) => setStorySize(e.target.value)}
                    placeholder="Isi"
                    className="w-14 h-10 text-center bg-white border-2 border-amber-300 rounded-xl focus:border-emerald-600 focus:outline-none font-bold text-sm shadow-inner"
                  />
                  <span className="text-xl text-amber-800 font-bold">=</span>
                  <input
                    type="number"
                    value={storyResult}
                    onChange={(e) => setStoryResult(e.target.value)}
                    placeholder="Hasil"
                    className="w-16 h-10 text-center bg-white border-2 border-amber-300 rounded-xl focus:border-emerald-600 focus:outline-none font-bold text-sm shadow-inner"
                  />
                </div>
                <div className="text-[11px] font-bold mt-1 text-amber-700">
                  Ketik kalimat pembagian berdasarkan cerita
                </div>
              </div>
            )}

            <div className="flex gap-2.5 pt-1">
              <button
                onClick={handleCheckAnswer}
                className="btn-game-primary flex-grow text-white font-game text-xs sm:text-sm py-3.5 px-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-md"
              >
                <i className="fa-solid fa-circle-check text-yellow-300 text-lg"></i>
                <span>Cek Jawaban & Wadah</span>
              </button>
              <button
                onClick={handleUseHint}
                className="btn-game-amber text-white font-game text-xs sm:text-sm py-3 px-3.5 rounded-2xl font-bold flex items-center gap-1.5"
                title="Gunakan 20 Poin untuk Membuka Tips"
              >
                <span>💡</span> Tips (-20)
              </button>
              <button
                onClick={handleResetQuestion}
                className="btn-game-secondary font-game text-xs sm:text-sm py-3 px-3.5 rounded-2xl font-bold"
                title="Ulangi Soal Ini"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Feedback Panel */}
      {showFeedback && (
        <div className="bg-emerald-900/95 backdrop-blur-md text-white border-4 border-yellow-400 rounded-3xl p-6 shadow-2xl text-center space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-center gap-4">
            <div className="relative">
              <img
                src="/pak_kades_senang.jpg"
                alt="Pak Kades Bahagia"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-yellow-300 shadow-lg object-cover ring-2 ring-emerald-500"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/pak_kades.jpg';
                }}
              />
              <span className="absolute -bottom-1 -right-1 bg-amber-500 text-white text-xs px-1.5 py-0.5 rounded-full shadow font-bold">
                ⭐
              </span>
            </div>
            <div className="text-left">
              <span className="inline-block bg-red-600 text-white font-game font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-xs mb-1">
                🎉 Kamu Hebat!
              </span>
              <h3 className="font-game text-xl sm:text-2xl font-bold text-yellow-300">
                Jawaban & Pembagian Tepat!
              </h3>
              <p className="text-xs text-emerald-200">
                Pak Kades sangat bangga dengan kerja kerasmu!
              </p>
            </div>
          </div>

          <div className="bg-emerald-950/80 border border-emerald-600 rounded-2xl p-3.5 space-y-1">
            <div className="font-game text-lg sm:text-xl text-yellow-300 font-extrabold tracking-wide">
              {Array.from({ length: containers.length }).map(() => question.groupSize).join(' - ')} = 0 ({containers.length} kali pengurangan)
            </div>
            <div className="text-xs sm:text-sm text-emerald-100 font-medium">
              Artinya: {question.total} ÷ {question.groupSize} = {containers.length} Wadah
            </div>
          </div>

          {question.hots && (
            <div className="text-xs bg-emerald-950 p-3 rounded-xl border border-emerald-700 text-emerald-200 text-left">
              💡 <strong>Analisis HOTS:</strong> Mula-mula {question.actualTotal} disisihkan {question.reserve} benda ke Area Cadangan ({question.actualTotal} - {question.reserve} = {question.total}). Kemudian sisa {question.total} ÷ {question.groupSize} = {containers.length} wadah.
            </div>
          )}

          <button
            onClick={() => {
              playMenuSelectSound();
              onNextQuestion();
            }}
            className="btn-game-amber w-full sm:w-auto text-emerald-950 font-game font-extrabold px-10 py-4 rounded-2xl text-base sm:text-lg cursor-pointer"
          >
            Lanjut ke Soal Berikutnya ➔
          </button>
        </div>
      )}

      {/* Alert / Info Modal */}
      {alertMessage && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-4 border-emerald-600 max-w-md w-full p-6 shadow-2xl text-center space-y-4">
            <div className="text-5xl">{alertMessage.icon}</div>
            <h3 className="font-game text-xl font-bold text-gray-800">
              {alertMessage.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {alertMessage.text}
            </p>
            <div className="flex justify-center pt-2">
              <button
                onClick={() => setAlertMessage(null)}
                className="btn-game-primary text-white font-game font-bold px-7 py-3 rounded-xl"
              >
                Mengerti
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
