import React from 'react';

export interface ItemIconProps {
  nameOrEmoji?: string;
  itemKey?: string;
  className?: string;
  size?: number | string;
}

export function resolveItemKey(itemKey?: string, nameOrEmoji?: string): string {
  if (itemKey) return itemKey.toLowerCase();
  const text = (nameOrEmoji || '').toLowerCase();
  if (text.includes('sayur') || text.includes('🥬') || text.includes('🥦') || text.includes('🥕')) return 'sayur';
  if (text.includes('buah') || text.includes('🍎') || text.includes('🍏') || text.includes('🍊') || text.includes('🍌') || text.includes('apel') || text.includes('jeruk')) return 'buah';
  if (text.includes('telur') || text.includes('🥚')) return 'telur';
  if (text.includes('beras') || text.includes('🌾') || text.includes('padi')) return 'beras';
  if (text.includes('ikan') || text.includes('🐟')) return 'ikan';
  if (text.includes('kayu') || text.includes('🪵')) return 'kayu';
  if (text.includes('bibit') || text.includes('🌱')) return 'bibit';
  if (text.includes('madu') || text.includes('🍯')) return 'madu';
  if (text.includes('susu') || text.includes('🥛')) return 'susu';
  return 'beras'; // default friendly harvest
}

// 1. Sayur - Keranjang Anyaman Berisi Sayuran Segar (Wortel, Tomat, Kubis)
export const SayurIcon: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="sayur_basket" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="60%" stopColor="#d97706" />
        <stop offset="100%" stopColor="#854d0e" />
      </radialGradient>
      <linearGradient id="sayur_cabbage" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#86efac" />
        <stop offset="60%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#15803d" />
      </linearGradient>
      <linearGradient id="sayur_tomato" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f87171" />
        <stop offset="50%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#b91c1c" />
      </linearGradient>
      <linearGradient id="sayur_carrot" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fb923c" />
        <stop offset="70%" stopColor="#ea580c" />
        <stop offset="100%" stopColor="#c2410c" />
      </linearGradient>
    </defs>
    {/* Shadow */}
    <ellipse cx="50" cy="90" rx="34" ry="7" fill="#064e3b" fillOpacity="0.25" />
    
    {/* Fresh Vegetables inside */}
    {/* Cabbage (Left) */}
    <circle cx="34" cy="40" r="16" fill="url(#sayur_cabbage)" stroke="#166534" strokeWidth="2.5" />
    <path d="M26 34 Q34 44 42 36 Q38 48 26 44" stroke="#bbf7d0" strokeWidth="2" strokeLinecap="round" fill="none" />
    
    {/* Carrot (Right) */}
    <path d="M62 25 L75 52 L66 54 Z" fill="url(#sayur_carrot)" stroke="#9a3412" strokeWidth="2.5" />
    <path d="M60 26 Q56 16 52 14 M62 24 Q63 12 62 10 M64 25 Q70 14 74 15" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" />
    
    {/* Tomato (Center Front) */}
    <circle cx="50" cy="46" r="13" fill="url(#sayur_tomato)" stroke="#991b1b" strokeWidth="2.5" />
    <circle cx="46" cy="41" r="2.5" fill="#fecaca" />
    {/* Tomato Leaves */}
    <path d="M50 33 L47 30 M50 33 L53 30 M50 33 L50 28" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" />

    {/* Yellow Pepper / Veggie (Right) */}
    <circle cx="64" cy="42" r="10" fill="#eab308" stroke="#a16207" strokeWidth="2.2" />

    {/* Woven Basket */}
    <path
      d="M18 50 C18 47 82 47 82 50 L75 80 C74 85 26 85 25 80 Z"
      fill="url(#sayur_basket)"
      stroke="#78350f"
      strokeWidth="3.5"
    />
    {/* Basket Rim */}
    <ellipse cx="50" cy="50" rx="33" ry="8" fill="#fcd34d" stroke="#78350f" strokeWidth="3.5" />
    <ellipse cx="50" cy="50" rx="30" ry="5.5" fill="#d97706" />
    
    {/* Wicker Weave Texture */}
    <path d="M26 56 Q50 64 74 56 M27 65 Q50 73 73 65 M30 74 Q50 81 70 74" stroke="#78350f" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.65" />
    <path d="M38 52 L34 81 M50 52 L50 83 M62 52 L66 81" stroke="#78350f" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.65" />
  </svg>
);

// 2. Buah - Keranjang Buah Segar (Pisang, Apel, Anggur, Jeruk)
export const BuahIcon: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="buah_basket" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="60%" stopColor="#d97706" />
        <stop offset="100%" stopColor="#854d0e" />
      </radialGradient>
      <linearGradient id="buah_apple" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f87171" />
        <stop offset="50%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#991b1b" />
      </linearGradient>
      <linearGradient id="buah_banana" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="50%" stopColor="#facc15" />
        <stop offset="100%" stopColor="#ca8a04" />
      </linearGradient>
    </defs>
    {/* Shadow */}
    <ellipse cx="50" cy="90" rx="34" ry="7" fill="#064e3b" fillOpacity="0.25" />

    {/* Fruits in basket */}
    {/* Banana Bunch (Back Left) */}
    <path
      d="M25 22 C35 24 45 36 46 50 C38 42 28 32 23 23 Z"
      fill="url(#buah_banana)"
      stroke="#a16207"
      strokeWidth="2.5"
    />
    <path
      d="M28 20 C40 24 50 36 51 49 C43 41 33 29 27 21 Z"
      fill="#fde047"
      stroke="#a16207"
      strokeWidth="2"
    />

    {/* Purple Grapes (Left) */}
    <circle cx="34" cy="46" r="6" fill="#a855f7" stroke="#6b21a8" strokeWidth="2" />
    <circle cx="39" cy="42" r="5.5" fill="#9333ea" stroke="#6b21a8" strokeWidth="2" />
    <circle cx="30" cy="40" r="5.5" fill="#7e22ce" stroke="#6b21a8" strokeWidth="2" />

    {/* Red Apple (Center) */}
    <circle cx="52" cy="43" r="13" fill="url(#buah_apple)" stroke="#7f1d1d" strokeWidth="2.5" />
    <circle cx="48" cy="38" r="2.5" fill="#fecaca" />
    <path d="M52 30 Q54 22 57 20" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M54 26 C58 24 63 26 62 30 C58 30 55 28 54 26 Z" fill="#22c55e" stroke="#15803d" strokeWidth="1.5" />

    {/* Orange (Right) */}
    <circle cx="68" cy="44" r="11" fill="#f97316" stroke="#9a3412" strokeWidth="2.5" />
    <circle cx="65" cy="39" r="2" fill="#fed7aa" />

    {/* Woven Basket */}
    <path
      d="M18 50 C18 47 82 47 82 50 L75 80 C74 85 26 85 25 80 Z"
      fill="url(#buah_basket)"
      stroke="#78350f"
      strokeWidth="3.5"
    />
    {/* Basket Rim */}
    <ellipse cx="50" cy="50" rx="33" ry="8" fill="#fcd34d" stroke="#78350f" strokeWidth="3.5" />
    <ellipse cx="50" cy="50" rx="30" ry="5.5" fill="#d97706" />

    {/* Wicker Weave Texture */}
    <path d="M26 56 Q50 64 74 56 M27 65 Q50 73 73 65 M30 74 Q50 81 70 74" stroke="#78350f" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.65" />
    <path d="M38 52 L34 81 M50 52 L50 83 M62 52 L66 81" stroke="#78350f" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.65" />
  </svg>
);

// 3. Telur - Keranjang Telur Ayam Segar
export const TelurIcon: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="telur_grad1" cx="40%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="40%" stopColor="#fed7aa" />
        <stop offset="100%" stopColor="#d97706" />
      </radialGradient>
      <radialGradient id="telur_grad2" cx="40%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#fffbeb" />
        <stop offset="45%" stopColor="#fde68a" />
        <stop offset="100%" stopColor="#b45309" />
      </radialGradient>
      <radialGradient id="telur_basket" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#d97706" />
        <stop offset="60%" stopColor="#b45309" />
        <stop offset="100%" stopColor="#78350f" />
      </radialGradient>
    </defs>
    {/* Shadow */}
    <ellipse cx="50" cy="90" rx="33" ry="7" fill="#064e3b" fillOpacity="0.25" />

    {/* Back row eggs */}
    <ellipse cx="36" cy="36" rx="9" ry="12" transform="rotate(-15 36 36)" fill="url(#telur_grad1)" stroke="#92400e" strokeWidth="2.2" />
    <ellipse cx="50" cy="33" rx="9.5" ry="13" fill="url(#telur_grad2)" stroke="#92400e" strokeWidth="2.2" />
    <ellipse cx="64" cy="36" rx="9" ry="12" transform="rotate(15 64 36)" fill="url(#telur_grad1)" stroke="#92400e" strokeWidth="2.2" />

    {/* Front row eggs */}
    <ellipse cx="42" cy="46" rx="10" ry="13.5" transform="rotate(-8 42 46)" fill="url(#telur_grad2)" stroke="#92400e" strokeWidth="2.5" />
    <ellipse cx="58" cy="46" rx="10" ry="13.5" transform="rotate(10 58 46)" fill="url(#telur_grad1)" stroke="#92400e" strokeWidth="2.5" />

    {/* Nest Straw Texture Bits */}
    <path d="M22 52 L28 47 M75 51 L68 47 M48 53 L52 48" stroke="#ca8a04" strokeWidth="2" strokeLinecap="round" />

    {/* Basket */}
    <path
      d="M20 52 C20 50 80 50 80 52 L73 80 C72 85 28 85 27 80 Z"
      fill="url(#telur_basket)"
      stroke="#451a03"
      strokeWidth="3.5"
    />
    <ellipse cx="50" cy="52" rx="31" ry="7" fill="#fde047" stroke="#451a03" strokeWidth="3.5" />
    <ellipse cx="50" cy="52" rx="28" ry="5" fill="#b45309" />

    {/* Weave Lines */}
    <path d="M28 58 Q50 65 72 58 M29 67 Q50 74 71 67" stroke="#451a03" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.65" />
    <path d="M38 54 L35 79 M50 54 L50 81 M62 54 L65 79" stroke="#451a03" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.65" />
  </svg>
);

// 4. Beras - Karung Goni Beras Putih Lumbung
export const BerasIcon: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="beras_sack" cx="45%" cy="45%" r="60%">
        <stop offset="0%" stopColor="#fde68a" />
        <stop offset="40%" stopColor="#d97706" />
        <stop offset="100%" stopColor="#78350f" />
      </radialGradient>
      <radialGradient id="beras_rice" cx="50%" cy="30%" r="55%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="70%" stopColor="#f1f5f9" />
        <stop offset="100%" stopColor="#cbd5e1" />
      </radialGradient>
    </defs>
    {/* Shadow */}
    <ellipse cx="50" cy="90" rx="33" ry="7" fill="#064e3b" fillOpacity="0.25" />

    {/* Sack Body */}
    <path
      d="M24 45 C18 60 16 80 26 86 C36 89 64 89 74 86 C84 80 82 60 76 45 C74 42 70 42 66 43 C56 45 44 45 34 43 C30 42 26 42 24 45 Z"
      fill="url(#beras_sack)"
      stroke="#451a03"
      strokeWidth="3.5"
    />

    {/* Burlap Rim / Folded Top */}
    <path
      d="M22 44 C24 38 76 38 78 44 C76 48 24 48 22 44 Z"
      fill="#b45309"
      stroke="#451a03"
      strokeWidth="3"
    />

    {/* Pile of Fresh Rice Grains at top */}
    <ellipse cx="50" cy="38" rx="26" ry="12" fill="url(#beras_rice)" stroke="#451a03" strokeWidth="3" />
    <path d="M35 34 C42 26 58 26 65 34 Z" fill="#ffffff" />

    {/* Rice Grains Details */}
    <ellipse cx="44" cy="34" rx="2" ry="3.5" transform="rotate(25 44 34)" fill="#e2e8f0" />
    <ellipse cx="52" cy="33" rx="2" ry="3.5" transform="rotate(-15 52 33)" fill="#cbd5e1" />
    <ellipse cx="59" cy="36" rx="2" ry="3.5" transform="rotate(35 59 36)" fill="#e2e8f0" />
    <ellipse cx="48" cy="39" rx="2" ry="3.5" transform="rotate(10 48 39)" fill="#cbd5e1" />

    {/* Sack Patches and Stitching */}
    <path d="M38 58 L46 58 L46 66 L38 66 Z" fill="#ca8a04" stroke="#78350f" strokeWidth="1.8" />
    <path d="M36 56 L48 68 M48 56 L36 68" stroke="#451a03" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M50 72 Q64 74 72 70" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 3" />
  </svg>
);

// 5. Ikan - Ikan Segar Biru Mengkilap
export const IkanIcon: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ikan_body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="45%" stopColor="#0284c7" />
        <stop offset="100%" stopColor="#0369a1" />
      </linearGradient>
      <linearGradient id="ikan_belly" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f0f9ff" />
        <stop offset="100%" stopColor="#bae6fd" />
      </linearGradient>
      <linearGradient id="ikan_fin" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#7dd3fc" />
        <stop offset="100%" stopColor="#0284c7" />
      </linearGradient>
    </defs>
    {/* Shadow */}
    <ellipse cx="50" cy="88" rx="34" ry="6" fill="#064e3b" fillOpacity="0.25" />

    {/* Tail Fin */}
    <path
      d="M72 50 C84 35 94 32 92 48 C94 64 84 62 72 50 Z"
      fill="url(#ikan_fin)"
      stroke="#0c4a6e"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <path d="M76 46 L88 42 M77 50 L90 50 M76 54 L88 57" stroke="#0284c7" strokeWidth="1.8" strokeLinecap="round" />

    {/* Dorsal Top Fin */}
    <path
      d="M40 28 C48 18 64 22 66 33 Z"
      fill="url(#ikan_fin)"
      stroke="#0c4a6e"
      strokeWidth="2.5"
    />

    {/* Fish Body */}
    <path
      d="M14 50 C20 32 60 28 76 50 C60 72 20 68 14 50 Z"
      fill="url(#ikan_body)"
      stroke="#0c4a6e"
      strokeWidth="3.5"
    />

    {/* Belly White Gradient */}
    <path
      d="M18 52 C26 64 56 65 72 52 C58 60 30 60 18 52 Z"
      fill="url(#ikan_belly)"
    />

    {/* Cute Big Eye */}
    <circle cx="28" cy="44" r="6.5" fill="#ffffff" stroke="#0c4a6e" strokeWidth="2.5" />
    <circle cx="27" cy="44" r="3.5" fill="#0f172a" />
    <circle cx="29" cy="42" r="1.3" fill="#ffffff" />

    {/* Mouth smile */}
    <path d="M14 50 Q18 53 21 51" stroke="#0c4a6e" strokeWidth="2.5" strokeLinecap="round" />

    {/* Pectoral Side Fin */}
    <path
      d="M38 52 C44 52 50 58 46 64 C40 64 36 58 38 52 Z"
      fill="url(#ikan_fin)"
      stroke="#0c4a6e"
      strokeWidth="2.2"
    />

    {/* Gills & Scales */}
    <path d="M34 38 Q38 48 34 58" stroke="#0284c7" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    <path d="M48 40 Q52 44 48 48 M54 44 Q58 48 54 52 M60 40 Q64 44 60 48" stroke="#7dd3fc" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.8" />
  </svg>
);

// 6. Kayu - Ikat Kayu Bakar Perapian Desa
export const KayuIcon: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="kayu_bark" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#a16207" />
        <stop offset="40%" stopColor="#78350f" />
        <stop offset="100%" stopColor="#451a03" />
      </linearGradient>
      <radialGradient id="kayu_ring" cx="45%" cy="45%" r="60%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="60%" stopColor="#d97706" />
        <stop offset="100%" stopColor="#92400e" />
      </radialGradient>
    </defs>
    {/* Shadow */}
    <ellipse cx="50" cy="88" rx="35" ry="7" fill="#064e3b" fillOpacity="0.25" />

    {/* Bottom Layer Logs */}
    {/* Log 1 (Left Bottom) */}
    <path d="M22 55 L74 38 L84 54 L32 71 Z" fill="url(#kayu_bark)" stroke="#290e03" strokeWidth="2.5" />
    <ellipse cx="27" cy="63" rx="7" ry="11" transform="rotate(-30 27 63)" fill="url(#kayu_ring)" stroke="#290e03" strokeWidth="2.5" />

    {/* Log 2 (Right Bottom) */}
    <path d="M36 63 L88 46 L94 60 L42 77 Z" fill="url(#kayu_bark)" stroke="#290e03" strokeWidth="2.5" />
    <ellipse cx="39" cy="70" rx="7" ry="11" transform="rotate(-30 39 70)" fill="url(#kayu_ring)" stroke="#290e03" strokeWidth="2.5" />

    {/* Middle Layer Log */}
    <path d="M16 43 L68 26 L78 42 L26 59 Z" fill="url(#kayu_bark)" stroke="#290e03" strokeWidth="2.5" />
    <ellipse cx="21" cy="51" rx="7" ry="11" transform="rotate(-30 21 51)" fill="url(#kayu_ring)" stroke="#290e03" strokeWidth="2.5" />
    <circle cx="21" cy="51" r="3" stroke="#78350f" strokeWidth="1.5" fill="none" />

    {/* Top Peak Log */}
    <path d="M26 31 L78 14 L88 30 L36 47 Z" fill="url(#kayu_bark)" stroke="#290e03" strokeWidth="3" />
    <ellipse cx="31" cy="39" rx="7.5" ry="11.5" transform="rotate(-30 31 39)" fill="url(#kayu_ring)" stroke="#290e03" strokeWidth="3" />
    <circle cx="31" cy="39" r="4" stroke="#78350f" strokeWidth="1.5" fill="none" />
    <circle cx="31" cy="39" r="1.5" fill="#451a03" />

    {/* Binding Rope around bundle */}
    <path d="M52 22 L62 58 M60 20 L70 56" stroke="#fde047" strokeWidth="4.5" strokeLinecap="round" />
    <path d="M52 22 L62 58 M60 20 L70 56" stroke="#ca8a04" strokeWidth="2" strokeLinecap="round" />
    {/* Rope Knot */}
    <circle cx="56" cy="40" r="4.5" fill="#eab308" stroke="#78350f" strokeWidth="2" />
  </svg>
);

// 7. Bibit - Karung Bibit Tanaman Tanah Subur
export const BibitIcon: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="bibit_sack" cx="45%" cy="45%" r="60%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="50%" stopColor="#d97706" />
        <stop offset="100%" stopColor="#78350f" />
      </radialGradient>
      <linearGradient id="bibit_leaf1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#86efac" />
        <stop offset="60%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#15803d" />
      </linearGradient>
      <linearGradient id="bibit_leaf2" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#4ade80" />
        <stop offset="60%" stopColor="#16a34a" />
        <stop offset="100%" stopColor="#14532d" />
      </linearGradient>
    </defs>
    {/* Shadow */}
    <ellipse cx="50" cy="90" rx="32" ry="7" fill="#064e3b" fillOpacity="0.25" />

    {/* Sprouting Green Plant */}
    {/* Stem */}
    <path d="M50 50 Q50 30 50 20" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />

    {/* Left Sprout Leaf */}
    <path
      d="M50 24 C34 16 32 32 50 30 Z"
      fill="url(#bibit_leaf1)"
      stroke="#14532d"
      strokeWidth="2.5"
    />
    <path d="M38 22 Q44 26 49 26" stroke="#bbf7d0" strokeWidth="1.5" strokeLinecap="round" fill="none" />

    {/* Right Sprout Leaf */}
    <path
      d="M50 22 C66 12 70 30 50 28 Z"
      fill="url(#bibit_leaf2)"
      stroke="#14532d"
      strokeWidth="2.5"
    />
    <path d="M60 18 Q55 24 51 25" stroke="#bbf7d0" strokeWidth="1.5" strokeLinecap="round" fill="none" />

    {/* Planter Sack Body */}
    <path
      d="M26 50 C20 62 18 80 28 86 C36 89 64 89 72 86 C82 80 80 62 74 50 C72 47 68 47 64 48 C56 50 44 50 36 48 C32 47 28 47 26 50 Z"
      fill="url(#bibit_sack)"
      stroke="#451a03"
      strokeWidth="3.5"
    />

    {/* Dark Fertile Soil Top */}
    <ellipse cx="50" cy="50" rx="26" ry="9" fill="#451a03" stroke="#290e03" strokeWidth="3" />
    <ellipse cx="50" cy="50" rx="22" ry="6" fill="#713f12" />

    {/* Cute plant tag / patch */}
    <circle cx="50" cy="68" r="7" fill="#fef08a" stroke="#78350f" strokeWidth="2" />
    <path d="M50 64 L50 71 M48 66 L50 64 L52 66" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

// 8. Madu - Toples Kaca Madu Alami
export const MaduIcon: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="madu_honey" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="40%" stopColor="#fbbf24" />
        <stop offset="80%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
      <linearGradient id="madu_cloth" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fb923c" />
        <stop offset="60%" stopColor="#ea580c" />
        <stop offset="100%" stopColor="#9a3412" />
      </linearGradient>
    </defs>
    {/* Shadow */}
    <ellipse cx="50" cy="88" rx="30" ry="6" fill="#064e3b" fillOpacity="0.25" />

    {/* Glass Jar Body */}
    <path
      d="M26 40 C22 55 20 75 28 82 C35 86 65 86 72 82 C80 75 78 55 74 40 Z"
      fill="url(#madu_honey)"
      stroke="#78350f"
      strokeWidth="3.5"
    />

    {/* Jar Glass Reflection Highlight */}
    <path d="M30 46 C26 58 26 72 32 78" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.75" />

    {/* Honey Drips over jar rim */}
    <path
      d="M26 40 C26 40 34 52 40 46 C44 42 48 56 54 48 C58 42 66 50 74 40 Z"
      fill="#fde047"
    />

    {/* Honeycomb Honey Jar Label */}
    <polygon points="50,54 58,58 58,68 50,72 42,68 42,58" fill="#ffffff" stroke="#b45309" strokeWidth="2" />
    {/* Bee emblem */}
    <ellipse cx="50" cy="63" rx="4" ry="3" fill="#fbbf24" stroke="#451a03" strokeWidth="1" />
    <path d="M48 61 L48 65 M50 61 L50 65 M52 61 L52 65" stroke="#451a03" strokeWidth="0.8" />
    <ellipse cx="48" cy="59" rx="1.8" ry="1.2" transform="rotate(-30 48 59)" fill="#bae6fd" />
    <ellipse cx="52" cy="59" rx="1.8" ry="1.2" transform="rotate(30 52 59)" fill="#bae6fd" />

    {/* Cloth Jar Cover */}
    <path
      d="M24 35 C24 30 76 30 76 35 L80 40 C75 43 70 38 65 41 C60 44 55 39 50 41 C45 44 40 39 35 41 C30 38 25 43 20 40 Z"
      fill="url(#madu_cloth)"
      stroke="#78350f"
      strokeWidth="3"
    />
    {/* Jar Lid Ring */}
    <ellipse cx="50" cy="32" rx="26" ry="6" fill="#fde047" stroke="#78350f" strokeWidth="2.5" />

    {/* Twine String around neck */}
    <path d="M26 38 C34 40 66 40 74 38" stroke="#451a03" strokeWidth="3" strokeLinecap="round" />
    {/* Hanging Tag */}
    <path d="M68 39 L74 48 L80 46 L74 37 Z" fill="#fef08a" stroke="#78350f" strokeWidth="1.5" />
  </svg>
);

// 9. Susu - Botol Susu Murni Sapi
export const SusuIcon: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="susu_bottle" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="60%" stopColor="#f8fafc" />
        <stop offset="100%" stopColor="#e2e8f0" />
      </linearGradient>
    </defs>
    {/* Shadow */}
    <ellipse cx="50" cy="88" rx="26" ry="6" fill="#064e3b" fillOpacity="0.25" />

    {/* Bottle Body */}
    <path
      d="M38 32 L36 44 C30 48 30 78 32 83 C35 86 65 86 68 83 C70 78 70 48 64 44 L62 32 Z"
      fill="url(#susu_bottle)"
      stroke="#334155"
      strokeWidth="3.5"
    />

    {/* Blue Milk Cap */}
    <path d="M36 24 C36 21 64 21 64 24 L62 32 L38 32 Z" fill="#0284c7" stroke="#0c4a6e" strokeWidth="3" />
    <ellipse cx="50" cy="23" rx="14" ry="4" fill="#38bdf8" />

    {/* Cow Spot on Bottle */}
    <rect x="36" y="52" width="28" height="20" rx="4" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
    <circle cx="50" cy="62" r="5" fill="#ffffff" />
    <ellipse cx="48" cy="61" rx="2" ry="1.5" fill="#0f172a" />
    <path d="M46 64 C47 66 53 66 54 64" stroke="#0f172a" strokeWidth="1" strokeLinecap="round" fill="none" />

    {/* Reflection Highlight */}
    <path d="M35 50 L35 76" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// Main Master Item Component
export const ItemIcon: React.FC<ItemIconProps> = ({
  nameOrEmoji,
  itemKey,
  className = 'w-full h-full',
  size,
}) => {
  const resolved = resolveItemKey(itemKey, nameOrEmoji);

  const style = size
    ? {
        width: typeof size === 'number' ? `${size}px` : size,
        height: typeof size === 'number' ? `${size}px` : size,
      }
    : undefined;

  let IconComponent = BerasIcon;
  switch (resolved) {
    case 'sayur':
      IconComponent = SayurIcon;
      break;
    case 'buah':
      IconComponent = BuahIcon;
      break;
    case 'telur':
      IconComponent = TelurIcon;
      break;
    case 'beras':
      IconComponent = BerasIcon;
      break;
    case 'ikan':
      IconComponent = IkanIcon;
      break;
    case 'kayu':
      IconComponent = KayuIcon;
      break;
    case 'bibit':
      IconComponent = BibitIcon;
      break;
    case 'madu':
      IconComponent = MaduIcon;
      break;
    case 'susu':
      IconComponent = SusuIcon;
      break;
    default:
      IconComponent = BerasIcon;
  }

  return (
    <div className={`inline-flex items-center justify-center select-none ${className}`} style={style}>
      <IconComponent className="w-full h-full drop-shadow-sm filter" />
    </div>
  );
};
