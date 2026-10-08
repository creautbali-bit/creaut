# Creaut Bali — Website

Website company profile Creaut Bali (Next.js App Router + GSAP + Lenis).

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

## Struktur Folder

```
src/
├─ app/                  # Routing (App Router) — hanya page/layout
│  ├─ layout.js          # Root layout + font Plus Jakarta Sans
│  ├─ globals.css        # CSS variable, Tailwind theme, utilitas global
│  ├─ page.js            # Home
│  ├─ about/             # About Us (Who We Are, Story, Vision & Mission, Values, Team)
│  ├─ our-work/
│  ├─ headquarter/
│  └─ services/<layanan>/ (page.js + portfolio/page.js)
├─ components/
│  ├─ layout/            # Navbar, Footer
│  ├─ sections/          # HeroServices, CTA (blok halaman)
│  ├─ ui/                # PortfolioCard, VideoModal (komponen reusable)
│  └─ about/             # Komponen khusus halaman About
├─ hooks/                # useLenis (smooth scroll, native di layar sentuh), useMediaQuery
├─ data/                 # Konten statis (about.js: tim, nilai, visi & misi)
├─ config/               # site.js (metadata, menu navigasi)
├─ i18n/                 # Dua bahasa (EN/ID): LanguageProvider + dictionaries/{en,id}.js
└─ lib/                  # fonts.js (next/font)
public/image/            # Aset gambar
public/video/            # Video kartu layanan (mp4 + poster webp) — jangan pakai GIF
```

Import memakai alias `@/` → `src/` (mis. `@/components/layout/Navbar`).

## Konvensi

- **Font**: Plus Jakarta Sans via `next/font` (`src/lib/fonts.js`). Pakai `font-family: var(--font-sans)` — jangan hardcode nama font.
- **Konten** yang sering berubah (visi/misi, tim, statistik) diedit di `src/data/`, bukan di JSX.
- **Smooth scroll**: selalu lewat hook `useLenis`, jangan inisialisasi Lenis manual di page.
- Nama file komponen: PascalCase.

## Dua Bahasa (EN / ID)

- Semua teks yang tampil ada di `src/i18n/dictionaries/en.js` dan `id.js` (struktur key harus sama).
- Di komponen: `const { t, dict } = useTranslation()` → `t('nav.about')` atau `dict.about.values.map(...)`.
- Tombol ganti bahasa: `components/ui/LanguageSwitcher.js`; pilihan tersimpan di `localStorage`.
- Menambah bahasa: tambah file kamus + daftarkan di `i18n/config.js` dan `dictionaries/index.js`.
- Halaman yang sudah diterjemahkan: Home, Navbar, Footer, About, Headquarter.

## Aset & Performa

- Animasi di kartu layanan memakai **video mp4 + poster** (bukan GIF) dan hanya diputar saat terlihat.
- Di HP/tablet, smooth-scroll JS (Lenis) dimatikan; scroll memakai native browser.

## Brand

Cyan `#5de0e6` → Blue `#004aad`.
