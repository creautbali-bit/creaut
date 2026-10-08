'use client'

import { locales, localeLabels } from '@/i18n/config'
import { useTranslation } from '@/i18n/LanguageProvider'

/**
 * Tombol pengganti bahasa (EN | ID).
 * @param {'light'|'dark'} [tone='light'] light = untuk latar terang, dark = latar gelap.
 */
export default function LanguageSwitcher({ tone = 'light', style }) {
  const { locale, setLocale, t } = useTranslation()
  const dark = tone === 'dark'

  return (
    <div
      role="group"
      aria-label={t('nav.language')}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: 3,
        borderRadius: 999,
        border: `1px solid ${dark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.15)'}`,
        background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.6)',
        ...style,
      }}
    >
      {locales.map((code) => {
        const active = code === locale
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            lang={code}
            title={localeLabels[code].name}
            style={{
              border: 'none',
              cursor: active ? 'default' : 'pointer',
              padding: '0.3rem 0.65rem',
              borderRadius: 999,
              fontFamily: 'var(--font-sans)',
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              transition: 'background 0.25s, color 0.25s',
              color: active ? '#fff' : dark ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.55)',
              background: active ? 'linear-gradient(90deg, #5de0e6, #004aad)' : 'transparent',
            }}
          >
            {localeLabels[code].short}
          </button>
        )
      })}
    </div>
  )
}
