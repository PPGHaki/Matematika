import React, { useState, useEffect } from 'react';
import { Question, LevelNumber, ScreenState } from './types';
import { defaultQuestionBank } from './questions';
import { Header } from './components/Header';
import { CoverScreen } from './components/CoverScreen';
import { LevelSelectScreen } from './components/LevelSelectScreen';
import { EditorModal } from './components/EditorModal';
import { GameScreen } from './components/GameScreen';
import { LevelResultScreen, GrandResultScreen } from './components/ResultScreens';
import { playApplauseSound } from './audio';
import { resolveItemKey } from './components/ItemIcon';

const STORAGE_KEY = 'desa_pendem_questions_v2';

export default function App() {
  const [questionBank, setQuestionBank] = useState<Record<LevelNumber, Question[]>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed[1] && parsed[1].length > 0) {
          ([1, 2, 3, 4] as LevelNumber[]).forEach((lvl) => {
            parsed[lvl]?.forEach((q: Question) => {
              if (!q.itemKey) {
                q.itemKey = resolveItemKey(undefined, q.title + ' ' + q.emoji);
              }
            });
          });
          return parsed;
        }
      }
    } catch {}
    return defaultQuestionBank;
  });

  const [currentScreen, setCurrentScreen] = useState<ScreenState>('cover');
  const [currentLevel, setCurrentLevel] = useState<LevelNumber>(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  // Level stats tracking
  const [levelCorrectCount, setLevelCorrectCount] = useState<number>(0);
  const [levelWrongCount, setLevelWrongCount] = useState<number>(0);
  const [levelTipScoreSpent, setLevelTipScoreSpent] = useState<number>(0);
  const [levelScoreGained, setLevelScoreGained] = useState<number>(0);

  // Save to localStorage when questionBank changes
  const handleUpdateQuestionBank = (newBank: Record<LevelNumber, Question[]>) => {
    setQuestionBank(newBank);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newBank));
    } catch {}
  };

  const handleStartGame = () => {
    setCurrentScreen('levels');
  };

  const handleSelectLevel = (level: LevelNumber) => {
    const list = questionBank[level] || [];
    if (list.length === 0) {
      alert(`Belum ada soal pada Level ${level}! Silakan tambahkan soal melalui 'Menu Kelola Soal'.`);
      return;
    }
    setCurrentLevel(level);
    setCurrentQuestionIndex(0);
    setLevelCorrectCount(0);
    setLevelWrongCount(0);
    setLevelTipScoreSpent(0);
    setLevelScoreGained(0);
    setCurrentScreen('game');
  };

  const handleQuestionCompleted = (isCorrect: boolean, tipSpent: number) => {
    if (isCorrect) {
      setLevelCorrectCount((prev) => prev + 1);
      setLevelScoreGained((prev) => prev + 20);
    } else {
      setLevelWrongCount((prev) => prev + 1);
    }
    if (tipSpent > 0) {
      setLevelTipScoreSpent((prev) => prev + tipSpent);
    }
  };

  const handleNextQuestion = () => {
    const total = (questionBank[currentLevel] || []).length;
    if (currentQuestionIndex < total - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Completed level
      playApplauseSound();
      setCurrentScreen('level-result');
    }
  };

  const handleProceedToNextLevel = () => {
    if (currentLevel < 4) {
      handleSelectLevel((currentLevel + 1) as LevelNumber);
    } else {
      setCurrentScreen('grand-result');
    }
  };

  const currentQuestions = questionBank[currentLevel] || [];
  const currentQ = currentQuestions[currentQuestionIndex] || currentQuestions[0];

  return (
    <div className="min-h-screen flex flex-col justify-between text-gray-800 relative bg-emerald-50">
      {/* Background scenery layers */}
      <div className="bg-village-canvas" aria-hidden="true"></div>
      <div className="bg-village-overlay" aria-hidden="true"></div>

      {/* Header Bar */}
      <Header
        score={score}
        currentLevel={currentLevel}
        showStats={currentScreen === 'game' || currentScreen === 'level-result'}
        onGoCover={() => setCurrentScreen('cover')}
        onGoLevels={() => setCurrentScreen('levels')}
        onOpenEditor={() => setCurrentScreen('editor')}
      />

      {/* Main Container */}
      <main className="flex-grow flex items-center justify-center p-3 sm:p-6 relative z-10">
        <div className="w-full max-w-5xl">
          {currentScreen === 'cover' && <CoverScreen onStart={handleStartGame} />}

          {currentScreen === 'levels' && (
            <LevelSelectScreen
              questionBank={questionBank}
              onSelectLevel={handleSelectLevel}
              onBack={() => setCurrentScreen('cover')}
            />
          )}

          {currentScreen === 'editor' && (
            <EditorModal
              questionBank={questionBank}
              onUpdateQuestionBank={handleUpdateQuestionBank}
              onClose={() => setCurrentScreen('levels')}
            />
          )}

          {currentScreen === 'game' && currentQ && (
            <GameScreen
              level={currentLevel}
              question={currentQ}
              questionIndex={currentQuestionIndex}
              totalQuestions={currentQuestions.length}
              score={score}
              onUpdateScore={setScore}
              onQuestionCompleted={handleQuestionCompleted}
              onNextQuestion={handleNextQuestion}
            />
          )}

          {currentScreen === 'level-result' && (
            <LevelResultScreen
              level={currentLevel}
              correctCount={levelCorrectCount}
              wrongCount={levelWrongCount}
              tipScoreSpent={levelTipScoreSpent}
              levelScoreGained={levelScoreGained}
              totalScore={score}
              onNextLevel={handleProceedToNextLevel}
              onRetryLevel={() => handleSelectLevel(currentLevel)}
              onGoLevelSelect={() => setCurrentScreen('levels')}
            />
          )}

          {currentScreen === 'grand-result' && (
            <GrandResultScreen
              score={score}
              onGoLevelSelect={() => setCurrentScreen('levels')}
              onGoCover={() => setCurrentScreen('cover')}
            />
          )}
        </div>
      </main>

      <footer className="text-center py-2 relative z-10 text-[11px] text-emerald-950 font-bold bg-white/40 backdrop-blur-xs">
        Petualangan Berbagi Matematika • Desa Pendem, Kota Batu
      </footer>
    </div>
  );
}
