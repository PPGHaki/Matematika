export interface Question {
  id?: string;
  title: string;
  type: 'Bentuk Angka' | 'Soal Cerita' | 'Soal HOTS 2-Langkah';
  emoji: string;
  itemKey?: string;
  total: number;
  groupSize: number;
  actualTotal?: number;
  reserve?: number;
  hots?: boolean;
  text: string;
}

export interface ContainerGroup {
  capacity: number;
  items: string[];
}

export type LevelNumber = 1 | 2 | 3 | 4;
export type ScreenState = 'cover' | 'levels' | 'editor' | 'game' | 'level-result' | 'grand-result';
