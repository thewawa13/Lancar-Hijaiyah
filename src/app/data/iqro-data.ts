export interface IqroPage {
  pageNumber: number;
  title: string;
  letters: IqroLetter[];
  notes?: string;
}

export interface IqroLetter {
  id: string;
  arabic: string;
  latin: string;
  audioFile: string;
  color?: string;
}

export interface IqroJilid {
  id: number;
  title: string;
  subtitle: string;
  color: string;
  gradient: string[];
  icon: string;
  emoji: string;
  totalPages: number;
  pages: IqroPage[];
}

const JILID_COLORS = [
  { color: '#e74c3c', gradient: ['#e74c3c', '#c0392b'], icon: '🔴', emoji: '🌟' },
  { color: '#e67e22', gradient: ['#e67e22', '#d35400'], icon: '🟠', emoji: '🎯' },
  { color: '#f1c40f', gradient: ['#f1c40f', '#f39c12'], icon: '🟡', emoji: '⭐' },
  { color: '#2ecc71', gradient: ['#2ecc71', '#27ae60'], icon: '🟢', emoji: '🌿' },
  { color: '#3498db', gradient: ['#3498db', '#2980b9'], icon: '🔵', emoji: '💧' },
  { color: '#9b59b6', gradient: ['#9b59b6', '#8e44ad'], icon: '🟣', emoji: '🌸' },
];

export const IQRO_DATA: IqroJilid[] = [
  {
    id: 1,
    title: 'Level 1',
    subtitle: 'Huruf Tunggal - Mengenal Huruf Hijaiyah',
    ...JILID_COLORS[0],
    totalPages: 6,
    pages: [
      {
        pageNumber: 1,
        title: 'Halaman 1',
        letters: [
          { id: 'alif', arabic: 'أ', latin: 'Alif', audioFile: 'alif', color: '#e74c3c' },
          { id: 'ba', arabic: 'ب', latin: 'Ba', audioFile: 'ba', color: '#c0392b' },
          { id: 'ta', arabic: 'ت', latin: 'Ta', audioFile: 'ta', color: '#e74c3c' },
          { id: 'tsa', arabic: 'ث', latin: 'Tsa', audioFile: 'tsa', color: '#c0392b' },
        ],
      },
      {
        pageNumber: 2,
        title: 'Halaman 2',
        letters: [
          { id: 'jim', arabic: 'ج', latin: 'Jim', audioFile: 'jim', color: '#e74c3c' },
          { id: 'ha', arabic: 'ح', latin: 'Ha', audioFile: 'ha', color: '#c0392b' },
          { id: 'kha', arabic: 'خ', latin: 'Kha', audioFile: 'kha', color: '#e74c3c' },
          { id: 'dal', arabic: 'د', latin: 'Dal', audioFile: 'dal', color: '#c0392b' },
        ],
      },
      {
        pageNumber: 3,
        title: 'Halaman 3',
        letters: [
          { id: 'dzal', arabic: 'ذ', latin: 'Dzal', audioFile: 'dzal', color: '#e74c3c' },
          { id: 'ra', arabic: 'ر', latin: 'Ra', audioFile: 'ra', color: '#c0392b' },
          { id: 'zai', arabic: 'ز', latin: 'Zai', audioFile: 'zai', color: '#e74c3c' },
          { id: 'sin', arabic: 'س', latin: 'Sin', audioFile: 'sin', color: '#c0392b' },
        ],
      },
      {
        pageNumber: 4,
        title: 'Halaman 4',
        letters: [
          { id: 'syin', arabic: 'ش', latin: 'Syin', audioFile: 'syin', color: '#e74c3c' },
          { id: 'shad', arabic: 'ص', latin: 'Shad', audioFile: 'shad', color: '#c0392b' },
          { id: 'dhad', arabic: 'ض', latin: 'Dhad', audioFile: 'dhad', color: '#e74c3c' },
          { id: 'tha', arabic: 'ط', latin: 'Tha', audioFile: 'tha', color: '#c0392b' },
        ],
      },
      {
        pageNumber: 5,
        title: 'Halaman 5',
        letters: [
          { id: 'zha', arabic: 'ظ', latin: 'Zha', audioFile: 'zha', color: '#e74c3c' },
          { id: 'ain', arabic: 'ع', latin: 'Ain', audioFile: 'ain', color: '#c0392b' },
          { id: 'ghain', arabic: 'غ', latin: 'Ghain', audioFile: 'ghain', color: '#e74c3c' },
          { id: 'fa', arabic: 'ف', latin: 'Fa', audioFile: 'fa', color: '#c0392b' },
        ],
      },
      {
        pageNumber: 6,
        title: 'Halaman 6',
        letters: [
          { id: 'qaf', arabic: 'ق', latin: 'Qaf', audioFile: 'qaf', color: '#e74c3c' },
          { id: 'kaf', arabic: 'ك', latin: 'Kaf', audioFile: 'kaf', color: '#c0392b' },
          { id: 'lam', arabic: 'ل', latin: 'Lam', audioFile: 'lam', color: '#e74c3c' },
          { id: 'mim', arabic: 'م', latin: 'Mim', audioFile: 'mim', color: '#c0392b' },
          { id: 'nun', arabic: 'ن', latin: 'Nun', audioFile: 'nun', color: '#e74c3c' },
          { id: 'wau', arabic: 'و', latin: 'Wau', audioFile: 'wau', color: '#c0392b' },
          { id: 'ha2', arabic: 'ه', latin: 'Ha', audioFile: 'ha2', color: '#e74c3c' },
          { id: 'lam_alif', arabic: 'لا', latin: 'Lam Alif', audioFile: 'lam_alif', color: '#c0392b' },
          { id: 'hamzah', arabic: 'ء', latin: 'Hamzah', audioFile: 'hamzah', color: '#c0392b' },
          { id: 'ya', arabic: 'ي', latin: 'Ya', audioFile: 'ya', color: '#c0392b' },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Level 2',
    subtitle: 'Harakat Fathah, Kasrah, Dhammah',
    ...JILID_COLORS[1],
    totalPages: 5,
    pages: [
      {
        pageNumber: 1, title: 'Halaman 1 - Fathah',
        notes: 'Harakat fathah dibaca "a"',
        letters: [
          { id: 'ba-fat', arabic: 'بَ', latin: 'Ba', audioFile: 'ba_fathah', color: '#e67e22' },
          { id: 'ta-fat', arabic: 'تَ', latin: 'Ta', audioFile: 'ta_fathah', color: '#d35400' },
          { id: 'ja-fat', arabic: 'جَ', latin: 'Ja', audioFile: 'ja_fathah', color: '#e67e22' },
          { id: 'da-fat', arabic: 'دَ', latin: 'Da', audioFile: 'da_fathah', color: '#d35400' },
        ],
      },
      {
        pageNumber: 2, title: 'Halaman 2 - Kasrah',
        notes: 'Harakat kasrah dibaca "i"',
        letters: [
          { id: 'bi-kas', arabic: 'بِ', latin: 'Bi', audioFile: 'bi_kasrah', color: '#e67e22' },
          { id: 'ti-kas', arabic: 'تِ', latin: 'Ti', audioFile: 'ti_kasrah', color: '#d35400' },
          { id: 'ji-kas', arabic: 'جِ', latin: 'Ji', audioFile: 'ji_kasrah', color: '#e67e22' },
          { id: 'di-kas', arabic: 'دِ', latin: 'Di', audioFile: 'di_kasrah', color: '#d35400' },
        ],
      },
      {
        pageNumber: 3, title: 'Halaman 3 - Dhammah',
        notes: 'Harakat dhammah dibaca "u"',
        letters: [
          { id: 'bu-dha', arabic: 'بُ', latin: 'Bu', audioFile: 'bu_dhammah', color: '#e67e22' },
          { id: 'tu-dha', arabic: 'تُ', latin: 'Tu', audioFile: 'tu_dhammah', color: '#d35400' },
          { id: 'ju-dha', arabic: 'جُ', latin: 'Ju', audioFile: 'ju_dhammah', color: '#e67e22' },
          { id: 'du-dha', arabic: 'دُ', latin: 'Du', audioFile: 'du_dhammah', color: '#d35400' },
        ],
      },
      {
        pageNumber: 4, title: 'Halaman 4 - Campuran Fathah-Kasrah',
        letters: [
          { id: 'ba-bi', arabic: 'بَ بِ', latin: 'Ba Bi', audioFile: 'ba_bi', color: '#e67e22' },
          { id: 'ta-ti', arabic: 'تَ تِ', latin: 'Ta Ti', audioFile: 'ta_ti', color: '#d35400' },
        ],
      },
      {
        pageNumber: 5, title: 'Halaman 5 - Campuran Fathah-Kasrah-Dhammah',
        letters: [
          { id: 'ba-bi-bu', arabic: 'بَ بِ بُ', latin: 'Ba Bi Bu', audioFile: 'ba_bi_bu', color: '#e67e22' },
          { id: 'ta-ti-tu', arabic: 'تَ تِ تُ', latin: 'Ta Ti Tu', audioFile: 'ta_ti_tu', color: '#d35400' },
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Level 3',
    subtitle: 'Mad (Bacaan Panjang)',
    ...JILID_COLORS[2],
    totalPages: 5,
    pages: [
      { pageNumber: 1, title: 'Halaman 1 - Mad Alif', notes: 'Dibaca 2 ketukan panjang',
        letters: [
          { id: 'ba-mad', arabic: 'بَا', latin: 'Baa', audioFile: 'baa', color: '#f1c40f' },
          { id: 'ta-mad', arabic: 'تَا', latin: 'Taa', audioFile: 'taa', color: '#f39c12' },
          { id: 'ja-mad', arabic: 'جَا', latin: 'Jaa', audioFile: 'jaa', color: '#f1c40f' },
        ] },
      { pageNumber: 2, title: 'Halaman 2 - Mad Ya', notes: 'Dibaca 2 ketukan panjang',
        letters: [
          { id: 'bi-mad', arabic: 'بِي', latin: 'Bii', audioFile: 'bii', color: '#f1c40f' },
          { id: 'ti-mad', arabic: 'تِي', latin: 'Tii', audioFile: 'tii', color: '#f39c12' },
        ] },
      { pageNumber: 3, title: 'Halaman 3 - Mad Wau', letters: [
          { id: 'bu-mad', arabic: 'بُو', latin: 'Buu', audioFile: 'buu', color: '#f1c40f' },
          { id: 'tu-mad', arabic: 'تُو', latin: 'Tuu', audioFile: 'tuu', color: '#f39c12' },
        ] },
      { pageNumber: 4, title: 'Halaman 4 - Latihan Mad', letters: [
          { id: 'lat1', arabic: 'بَابِي', latin: 'Baabii', audioFile: 'baabii', color: '#f1c40f' },
          { id: 'lat2', arabic: 'تَاتِي', latin: 'Taatii', audioFile: 'taatii', color: '#f39c12' },
        ] },
      { pageNumber: 5, title: 'Halaman 5 - Evaluasi Mad', letters: [
          { id: 'ev1', arabic: 'جَابُو', latin: 'Jaabuu', audioFile: 'jaabuu', color: '#f1c40f' },
        ] },
    ],
  },
  {
    id: 4,
    title: 'Level 4',
    subtitle: 'Tanwin & Sukun',
    ...JILID_COLORS[3],
    totalPages: 5,
    pages: [
      { pageNumber: 1, title: 'Halaman 1 - Tanwin Fathah', notes: 'Tanwin = bunyi "n" di akhir',
        letters: [
          { id: 'ban', arabic: 'بً', latin: 'Ban', audioFile: 'ban', color: '#2ecc71' },
          { id: 'tan', arabic: 'تً', latin: 'Tan', audioFile: 'tan', color: '#27ae60' },
        ] },
      { pageNumber: 2, title: 'Halaman 2 - Tanwin Kasrah', letters: [
          { id: 'bin', arabic: 'بٍ', latin: 'Bin', audioFile: 'bin', color: '#2ecc71' },
          { id: 'tin', arabic: 'تٍ', latin: 'Tin', audioFile: 'tin', color: '#27ae60' },
        ] },
      { pageNumber: 3, title: 'Halaman 3 - Tanwin Dhammah', letters: [
          { id: 'bun', arabic: 'بٌ', latin: 'Bun', audioFile: 'bun', color: '#2ecc71' },
          { id: 'tun', arabic: 'تٌ', latin: 'Tun', audioFile: 'tun', color: '#27ae60' },
        ] },
      { pageNumber: 4, title: 'Halaman 4 - Sukun', notes: 'Huruf mati tidak berbunyi vokal',
        letters: [
          { id: 'ab', arabic: 'أَبْ', latin: 'Ab', audioFile: 'ab', color: '#2ecc71' },
          { id: 'it', arabic: 'إِتْ', latin: 'It', audioFile: 'it', color: '#27ae60' },
        ] },
      { pageNumber: 5, title: 'Halaman 5 - Latihan Tanwin & Sukun', letters: [
          { id: 'kitab', arabic: 'كِتَابٌ', latin: 'Kitaabun', audioFile: 'kitaabun', color: '#2ecc71' },
          { id: 'baab', arabic: 'بَابٌ', latin: 'Baabun', audioFile: 'baabun', color: '#27ae60' },
        ] },
    ],
  },
  {
    id: 5,
    title: 'Level 5',
    subtitle: 'Tasydid & Bacaan Khusus',
    ...JILID_COLORS[4],
    totalPages: 4,
    pages: [
      { pageNumber: 1, title: 'Halaman 1 - Alif Lam Syamsiyah', notes: 'Al dibaca lebur ke huruf berikut',
        letters: [
          { id: 'as-syams', arabic: 'اَلشَّمْسُ', latin: 'Asy-Syamsu', audioFile: 'asy_syamsu', color: '#3498db' },
          { id: 'an-nur', arabic: 'اَلنُّوْرُ', latin: 'An-Nuuru', audioFile: 'an_nuuru', color: '#2980b9' },
        ] },
      { pageNumber: 2, title: 'Halaman 2 - Alif Lam Qamariyah', notes: 'Al dibaca jelas',
        letters: [
          { id: 'al-bayt', arabic: 'اَلْبَيْتُ', latin: 'Al-Baytu', audioFile: 'al_baitu', color: '#3498db' },
          { id: 'al-kitab', arabic: 'اَلْكِتَابُ', latin: 'Al-Kitaabu', audioFile: 'al_kitaabu', color: '#2980b9' },
        ] },
      { pageNumber: 3, title: 'Halaman 3 - Qalqalah', letters: [
          { id: 'qalq', arabic: 'قَدْ', latin: 'Qad', audioFile: 'qad', color: '#3498db' },
        ] },
      { pageNumber: 4, title: 'Halaman 4 - Evaluasi', letters: [
          { id: 'ev5', arabic: 'اَللهُ', latin: 'Allaahu', audioFile: 'allaahu', color: '#3498db' },
        ] },
    ],
  },
];