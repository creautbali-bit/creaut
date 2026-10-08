// Konten statis yang TIDAK bergantung bahasa (gambar, nama, angka).
// Semua teks yang diterjemahkan ada di src/i18n/dictionaries/*.js (about.*).

export const whoWeAreImages = [
  '/image/team/formal-bersama.webp',
  '/image/team/bos-besar.webp',
  '/image/team/pa-accounting.webp',
  '/image/team/lapangan.webp',
  '/image/team/editor.webp',
]

// CEO & Dewan Komisaris — `roleKey` mengacu ke about.jobTitles di kamus i18n
export const executives = [
  { name: 'Tri Ayu Laksmi Dewi', roleKey: 'ceo', img: '/image/team/ami.webp' },
  { name: 'Satria Denaksa', roleKey: 'chiefCommissioner', img: '/image/team/satria.webp' },
  { name: 'Anak Agung Ngurah Gede Semara Winangun Dharma', roleKey: 'commissioner', img: '/image/team/turah.webp' },
]

// Staff
export const staffMembers = [
  { name: 'Komang Damar Hadi Kusuma', roleKey: 'projectManager', img: '/image/team/damar.webp' },
  { name: 'Komang Pasek Triadi Marhaenata', roleKey: 'accounting', img: '/image/team/pasek.webp' },
  { name: 'Ni Made ochiana Septhi P', roleKey: 'personalAssistant', img: '/image/team/ocik.webp' },
  { name: 'Komang Yanna Brahmanta', roleKey: 'photoVideo', img: '/image/team/yanna.webp' },
  { name: 'Bagus Wiryanata Maheswara', roleKey: 'editor', img: '/image/team/bagus.webp' },
  { name: 'Ahmad Reza Eka Subiyanto', roleKey: 'editor', img: '/image/team/reza.webp' },
  { name: 'Sadewa Bharaka Mahaputra', roleKey: 'fullstack', img: '/image/team/sadewa.webp' },
]

// Angka statistik (label-nya ada di kamus: about.stats, urutan sama)
export const statValues = ['9+', '300+', '60+', '25']
