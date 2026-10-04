import { Question, LevelNumber } from './types';

export const defaultQuestionBank: Record<LevelNumber, Question[]> = {
  1: [
    {
      title: "Soal 1: Pembagian Karung Beras Desa",
      type: "Bentuk Angka",
      emoji: "🌾",
      itemKey: "beras",
      total: 6,
      groupSize: 2,
      text: "Pak Kades menyiapkan 6 karung beras dari lumbung Desa Pendem. Sebanyak 2 karung beras dibagikan ke setiap keluarga. Berapa keluarga yang menerima beras?"
    },
    {
      title: "Soal 2: Keranjang Sayur Segar Kebun",
      type: "Soal Cerita",
      emoji: "🥬",
      itemKey: "sayur",
      total: 8,
      groupSize: 4,
      text: "Warga memanen 8 keranjang sayuran segar (wortel, sawi, dan tomat). Sayuran dikemas ke dalam wadah masing-masing berisi 4 keranjang sayur. Berapa wadah yang dibutuhkan?"
    },
    {
      title: "Soal 3: Keranjang Buah Segar Desa",
      type: "Bentuk Angka",
      emoji: "🍎",
      itemKey: "buah",
      total: 9,
      groupSize: 3,
      text: "Petani memetik 9 keranjang buah manis. Buah dimasukkan ke beberapa wadah dengan isi 3 keranjang buah per wadah. Berapa wadah yang terisi?"
    },
    {
      title: "Soal 4: Keranjang Telur Ayam Kampung",
      type: "Soal Cerita",
      emoji: "🥚",
      itemKey: "telur",
      total: 10,
      groupSize: 2,
      text: "Peternak desa mengumpulkan 10 keranjang telur ayam kampung. Telur dibagikan ke wadah dengan isi 2 keranjang tiap wadah. Berapa wadah yang dihasilkan?"
    },
    {
      title: "Soal 5: Toples Madu Alami Pendem",
      type: "Bentuk Angka",
      emoji: "🍯",
      itemKey: "madu",
      total: 12,
      groupSize: 3,
      text: "Pak Wijaya memanen 12 toples madu lebah alami. Madu dikemas ke dalam wadah isi 3 toples. Berapa wadah yang terisi?"
    },
    {
      title: "Soal 6: Ikan Segar Kolam Desa",
      type: "Soal Cerita",
      emoji: "🐟",
      itemKey: "ikan",
      total: 12,
      groupSize: 4,
      text: "Warga menjaring 12 ekor ikan mas segar dari kolam desa. Ikan dimasukkan ke wadah masing-masing berisi 4 ekor. Berapa wadah ikan yang disiapkan?"
    }
  ],
  2: [
    {
      title: "Soal 1: Ikat Kayu Bakar Desa",
      type: "Bentuk Angka",
      emoji: "🪵",
      itemKey: "kayu",
      total: 10,
      groupSize: 5,
      text: "Perajin mengumpulkan 10 ikat kayu bakar. Kayu bakar dimasukkan ke wadah dengan isi 5 ikat per wadah. Berapa wadah yang dibutuhkan?"
    },
    {
      title: "Soal 2: Karung Bibit Tanaman Subur",
      type: "Soal Cerita",
      emoji: "🌱",
      itemKey: "bibit",
      total: 12,
      groupSize: 2,
      text: "Kelompok tani menyiapkan 12 karung bibit tanaman untuk penghijauan. Bibit dibagikan dengan isi 2 karung per wadah. Berapa wadah bibit yang dihasilkan?"
    },
    {
      title: "Soal 3: Keranjang Sayur Segar Balai Desa",
      type: "Bentuk Angka",
      emoji: "🥬",
      itemKey: "sayur",
      total: 15,
      groupSize: 3,
      text: "Ibu Kades membagikan 15 keranjang sayuran segar kepada warga. Setiap wadah diisi 3 keranjang sayur. Berapa wadah yang terisi penuh?"
    },
    {
      title: "Soal 4: Keranjang Telur Segar",
      type: "Soal Cerita",
      emoji: "🥚",
      itemKey: "telur",
      total: 14,
      groupSize: 2,
      text: "Warga mengumpulkan 14 keranjang telur segar. Telur dikelompokkan ke wadah masing-masing berisi 2 keranjang. Berapa wadah yang didapat?"
    },
    {
      title: "Soal 5: Panen Buah Jeruk Manis",
      type: "Bentuk Angka",
      emoji: "🍊",
      itemKey: "buah",
      total: 16,
      groupSize: 4,
      text: "Petani memetik 16 keranjang jeruk manis dari kebun desa. Jeruk dikemas ke wadah isi 4 keranjang. Berapa wadah yang terisi?"
    },
    {
      title: "Soal 6: Toples Madu Alami Sekarputih",
      type: "Soal Cerita",
      emoji: "🍯",
      itemKey: "madu",
      total: 18,
      groupSize: 3,
      text: "Pak Kades membagikan 18 toples madu alami. Madu dimasukkan ke wadah masing-masing berisi 3 toples. Berapa wadah yang dibutuhkan?"
    }
  ],
  3: [
    {
      title: "Soal 1: Karung Beras Panen Raya",
      type: "Bentuk Angka",
      emoji: "🌾",
      itemKey: "beras",
      total: 18,
      groupSize: 6,
      text: "Lumbung Desa Pendem menyiapkan 18 karung beras hasil panen raya. Setiap wadah diisi 6 karung beras. Berapa wadah yang terisi?"
    },
    {
      title: "Soal 2: Susu Murni Peternakan Batu",
      type: "Soal Cerita",
      emoji: "🥛",
      itemKey: "susu",
      total: 20,
      groupSize: 4,
      text: "Peternak mengumpulkan 20 botol susu murni sapi. Susu dikemas ke wadah masing-masing berisi 4 botol. Berapa wadah susu yang dapat dibuat?"
    },
    {
      title: "Soal 3: Ikan Segar Tambak Warga",
      type: "Bentuk Angka",
      emoji: "🐟",
      itemKey: "ikan",
      total: 20,
      groupSize: 5,
      text: "Warga memanen 20 ekor ikan segar dari tambak. Ikan dimasukkan ke wadah masing-masing berisi 5 ekor. Berapa wadah yang terisi?"
    },
    {
      title: "Soal 4: Ikat Kayu Bakar Perapian",
      type: "Soal Cerita",
      emoji: "🪵",
      itemKey: "kayu",
      total: 24,
      groupSize: 6,
      text: "Warga menyiapkan 24 ikat kayu bakar untuk pos ronda. Kayu dikelompokkan ke wadah isi 6 ikat. Berapa wadah kayu yang dihasilkan?"
    },
    {
      title: "Soal 5: Keranjang Sayur Kebun Organik",
      type: "Bentuk Angka",
      emoji: "🥬",
      itemKey: "sayur",
      total: 24,
      groupSize: 8,
      text: "Kelompok tani membagi 24 keranjang sayur ke dalam wadah berisi 8 keranjang tiap wadah. Berapa wadah yang terisi?"
    },
    {
      title: "Soal 6: Keranjang Buah Apel Manalagi",
      type: "Soal Cerita",
      emoji: "🍏",
      itemKey: "buah",
      total: 30,
      groupSize: 5,
      text: "Pak Kades memanen 30 keranjang apel segar. Apel dimasukkan ke wadah dengan isi 5 keranjang tiap wadah. Berapa wadah apel yang terkumpul?"
    }
  ],
  4: [
    {
      title: "Soal 1: Karung Beras & Cadangan Kantor (HOTS)",
      type: "Soal HOTS 2-Langkah",
      emoji: "🌾",
      itemKey: "beras",
      total: 12,
      actualTotal: 13,
      reserve: 1,
      groupSize: 3,
      hots: true,
      text: "Pak Kades membawa 13 karung beras dari lumbung. Sebanyak 1 karung disisihkan ke Area Cadangan untuk contoh kantor desa. Sisa beras dibagikan ke wadah berisi 3 karung. Berapa wadah yang terisi?"
    },
    {
      title: "Soal 2: Keranjang Sayur & Cadangan Dapur (HOTS)",
      type: "Soal HOTS 2-Langkah",
      emoji: "🥬",
      itemKey: "sayur",
      total: 15,
      actualTotal: 17,
      reserve: 2,
      groupSize: 5,
      hots: true,
      text: "Ibu PKK memanen 17 keranjang sayur. Sebanyak 2 keranjang disisihkan ke Area Cadangan untuk dapur umum. Sisa sayur dikemas ke wadah isi 5 keranjang. Berapa wadah yang terisi?"
    },
    {
      title: "Soal 3: Toples Madu & Cadangan Pameran (HOTS)",
      type: "Soal HOTS 2-Langkah",
      emoji: "🍯",
      itemKey: "madu",
      total: 18,
      actualTotal: 19,
      reserve: 1,
      groupSize: 6,
      hots: true,
      text: "Peternak lebah membawa 19 toples madu. Sebanyak 1 toples disisihkan ke Area Cadangan untuk pameran desa. Sisa madu dimasukkan ke wadah isi 6 toples. Berapa jumlah wadahnya?"
    },
    {
      title: "Soal 4: Keranjang Telur & Cadangan Posyandu (HOTS)",
      type: "Soal HOTS 2-Langkah",
      emoji: "🥚",
      itemKey: "telur",
      total: 20,
      actualTotal: 21,
      reserve: 1,
      groupSize: 4,
      hots: true,
      text: "Warga mengumpulkan 21 keranjang telur ayam. Sebanyak 1 keranjang disisihkan ke Area Cadangan untuk gizi posyandu. Sisa telur dikelompokkan ke wadah isi 4 keranjang. Berapa wadahnya?"
    },
    {
      title: "Soal 5: Ikan Segar & Cadangan Bibit Kolam (HOTS)",
      type: "Soal HOTS 2-Langkah",
      emoji: "🐟",
      itemKey: "ikan",
      total: 24,
      actualTotal: 26,
      reserve: 2,
      groupSize: 6,
      hots: true,
      text: "Warga memanen 26 ekor ikan segar. Sebanyak 2 ekor disisihkan ke Area Cadangan untuk induk pembibitan. Sisa ikan dikemas ke wadah isi 6 ekor. Berapa wadah yang terisi?"
    },
    {
      title: "Soal 6: Karung Bibit & Cadangan Kebun Desa (HOTS)",
      type: "Soal HOTS 2-Langkah",
      emoji: "🌱",
      itemKey: "bibit",
      total: 24,
      actualTotal: 27,
      reserve: 3,
      groupSize: 8,
      hots: true,
      text: "Petani menyiapkan 27 karung bibit tanaman. Sebanyak 3 karung disisihkan ke Area Cadangan untuk kebun percontohan. Sisa bibit dimasukkan ke wadah isi 8 karung. Berapa wadah yang dibutuhkan?"
    }
  ]
};
