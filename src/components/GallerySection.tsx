import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=85', alt: 'YO Classic Burger' },
  { src: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=85', alt: 'Mixed Grill Platter' },
  { src: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=600&q=85', alt: 'Grilled Chicken' },
  { src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=85', alt: 'Gourmet Dish' },
  { src: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=85', alt: 'Chocolate Cake' },
  { src: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=85', alt: 'Fresh Salad' },
  { src: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&q=85', alt: 'Double Smash Burger' },
  { src: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&q=85', alt: 'Signature Drink' },
];

const TOTAL = galleryImages.length;
const AUTO_SPEED = 2800; // ms per step

export default function GallerySection() {
  const { t } = useLanguage();
  const [rotation, setRotation] = useState(0); // degrees rotated so far
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stepAngle = 360 / TOTAL;

  const advance = (dir: 1 | -1 = 1) => {
    setRotation(prev => prev - dir * stepAngle);
    setActiveIdx(prev => (prev + dir + TOTAL) % TOTAL);
  };

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => advance(1), AUTO_SPEED);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPaused, rotation]);

  return (
    <section className="bg-gray-950 py-16 md:py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-red-500 text-base md:text-lg font-light tracking-[0.3em] uppercase mb-3">
            {t('home.gallery')}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            {t('home.galleryTitle')}
          </h2>
          <div className="w-16 h-1 bg-red-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* ── Circular Carousel ── */}
        <div
          className="relative mx-auto"
          style={{ width: '100%', maxWidth: 700, height: 520 }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {galleryImages.map((img, i) => {
            // angle of this card in the circle (offset by current rotation)
            const angle = (i * stepAngle + rotation) * (Math.PI / 180);

            // ellipse radii — wider than tall for a nice 3D-ish feel
            const rx = 260; // horizontal radius (px)
            const ry = 100; // vertical radius (depth perception)

            const cx = 350; // center x of container
            const cy = 240; // center y of container

            const x = cx + rx * Math.sin(angle);
            const y = cy + ry * Math.cos(angle);

            // z-depth: 1 = front, 0 = back
            const depth = (Math.cos(angle) + 1) / 2;

            // card that is closest to front (depth ≈ 1) = active
            const isFront = i === activeIdx;

            const scale = 0.55 + depth * 0.65; // 0.55 (back) → 1.2 (front)
            const opacity = 0.35 + depth * 0.65;
            const zIndex = Math.round(depth * 100);

            const cardW = isFront ? 200 : 150;
            const cardH = isFront ? 200 : 150;

            return (
              <div
                key={img.src}
                onClick={() => {
                  const diff = i - activeIdx;
                  // find shortest path
                  const steps = ((diff % TOTAL) + TOTAL) % TOTAL;
                  const dir: 1 | -1 = steps <= TOTAL / 2 ? -1 : 1;
                  advance(steps <= TOTAL / 2 ? -1 : 1);
                  void dir;
                }}
                style={{
                  position: 'absolute',
                  left: x - cardW / 2,
                  top: y - cardH / 2,
                  width: cardW,
                  height: cardH,
                  transform: `scale(${scale})`,
                  opacity,
                  zIndex,
                  transition: 'all 0.7s cubic-bezier(0.4,0,0.2,1)',
                  cursor: 'pointer',
                }}
              >
                <div
                  className="w-full h-full rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    boxShadow: isFront
                      ? '0 0 40px 6px rgba(220,38,38,0.45), 0 20px 60px rgba(0,0,0,0.7)'
                      : '0 8px 30px rgba(0,0,0,0.5)',
                    border: isFront ? '2.5px solid rgba(220,38,38,0.7)' : '1.5px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                    style={{
                      filter: isFront ? 'brightness(1.05)' : 'brightness(0.7)',
                      transition: 'filter 0.7s ease',
                    }}
                    loading="lazy"
                  />
                  {/* label on front card */}
                  {isFront && (
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-3">
                      <p className="text-white text-xs font-semibold text-center tracking-wide">{img.alt}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Center glow */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 180, height: 180,
              left: 350 - 90, top: 240 - 90,
              background: 'radial-gradient(circle, rgba(220,38,38,0.12) 0%, transparent 70%)',
              zIndex: 0,
            }}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            onClick={() => advance(-1)}
            className="w-11 h-11 rounded-full bg-gray-800 hover:bg-red-600 border border-gray-700 hover:border-red-500 text-white flex items-center justify-center transition-all duration-200 hover:scale-110"
            aria-label="Previous"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {galleryImages.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  const diff = ((i - activeIdx) % TOTAL + TOTAL) % TOTAL;
                  const steps = diff <= TOTAL / 2 ? diff : diff - TOTAL;
                  setRotation(r => r - steps * stepAngle);
                  setActiveIdx(i);
                }}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIdx ? 'w-6 h-2 bg-red-500' : 'w-2 h-2 bg-gray-600 hover:bg-gray-400'
                }`}
                aria-label={`Go to ${galleryImages[i].alt}`}
              />
            ))}
          </div>

          <button
            onClick={() => advance(1)}
            className="w-11 h-11 rounded-full bg-gray-800 hover:bg-red-600 border border-gray-700 hover:border-red-500 text-white flex items-center justify-center transition-all duration-200 hover:scale-110"
            aria-label="Next"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
