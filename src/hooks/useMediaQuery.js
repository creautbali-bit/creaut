'use client'

import { useSyncExternalStore } from 'react'

/**
 * Subscribe ke media query. Aman untuk SSR (server selalu `false`).
 * @param {string} query contoh: '(max-width: 767px)'
 */
export default function useMediaQuery(query) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}
