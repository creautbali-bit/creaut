'use client'

import { createContext, useContext, useMemo, useEffect, useSyncExternalStore } from 'react'
import { defaultLocale, locales, STORAGE_KEY } from './config'
import { dictionaries } from './dictionaries'

// ── Store kecil untuk pilihan bahasa (persisten di localStorage) ─────────────
// Server & render pertama memakai bahasa default; setelah hydrate React otomatis
// membaca pilihan tersimpan — tanpa hydration mismatch.
const listeners = new Set()
let current = null

function readStored() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return locales.includes(saved) ? saved : defaultLocale
  } catch {
    return defaultLocale
  }
}

function subscribe(callback) {
  listeners.add(callback)
  const onStorage = (e) => {
    if (e.key === STORAGE_KEY) {
      current = null // sinkron antar tab
      callback()
    }
  }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(callback)
    window.removeEventListener('storage', onStorage)
  }
}

const getSnapshot = () => (current ??= readStored())
const getServerSnapshot = () => defaultLocale

function setStoredLocale(next) {
  if (!locales.includes(next)) return
  current = next
  try {
    localStorage.setItem(STORAGE_KEY, next)
  } catch {
    /* storage tidak tersedia — pilihan berlaku selama sesi */
  }
  listeners.forEach((l) => l())
}

// ── Context ──────────────────────────────────────────────────────────────────
const LanguageContext = createContext(null)

/** Ambil nilai dari objek bersarang dengan path "a.b.c". */
function resolve(dict, path) {
  return path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), dict)
}

export function LanguageProvider({ children }) {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const value = useMemo(() => {
    const dict = dictionaries[locale]
    const fallback = dictionaries[defaultLocale]
    // t('footer.top') → string; fallback ke bahasa default bila key belum diterjemahkan.
    const t = (path) => resolve(dict, path) ?? resolve(fallback, path) ?? path
    return { locale, setLocale: setStoredLocale, dict, t }
  }, [locale])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useTranslation() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useTranslation harus dipakai di dalam <LanguageProvider>')
  return ctx
}
