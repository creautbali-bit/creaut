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
├─ hooks/                # useLenis (smooth scroll + sinkron GSAP)
├─ data/                 # Konten statis (about.js: tim, nilai, visi & misi)
├─ config/               # site.js (metadata, menu navigasi)
└─ lib/                  # fonts.js (next/font)
public/image/            # Aset gambar
```

Import memakai alias `@/` → `src/` (mis. `@/components/layout/Navbar`).

## Konvensi

- **Font**: Plus Jakarta Sans via `next/font` (`src/lib/fonts.js`). Pakai `font-family: var(--font-sans)` — jangan hardcode nama font.
- **Konten** yang sering berubah (visi/misi, tim, statistik) diedit di `src/data/`, bukan di JSX.
- **Smooth scroll**: selalu lewat hook `useLenis`, jangan inisialisasi Lenis manual di page.
- Nama file komponen: PascalCase.

## Brand

Cyan `#5de0e6` → Blue `#004aad`.
