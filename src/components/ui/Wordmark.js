// Logo teks "CREAUT" (public/image/logo/logoteks.webp).
// File aslinya punya area transparan di sekeliling huruf; wrapper ini memotongnya
// (via aspect-ratio + overflow hidden) supaya lebar/tinggi elemen = ukuran huruf sebenarnya.
// Bounding box huruf di gambar 1350×540: x 29–1321, y 137–403.

const SRC = { w: 1350, h: 540 }
const BOX = { x: 29, y: 137, w: 1292, h: 266 }

export default function Wordmark({ as: Tag = 'div', className, style, priority = false }) {
  return (
    <Tag className={className} style={style}>
      <span
        style={{
          display: 'block',
          position: 'relative',
          width: '100%',
          aspectRatio: `${BOX.w} / ${BOX.h}`,
          overflow: 'hidden',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/image/logo/logoteks.webp"
          alt="Creaut"
          draggable={false}
          fetchPriority={priority ? 'high' : undefined}
          style={{
            position: 'absolute',
            maxWidth: 'none',
            width: `${(SRC.w / BOX.w) * 100}%`,
            left: `${(-BOX.x / BOX.w) * 100}%`,
            top: `${(-BOX.y / BOX.h) * 100}%`,
            userSelect: 'none',
          }}
        />
      </span>
    </Tag>
  )
}
