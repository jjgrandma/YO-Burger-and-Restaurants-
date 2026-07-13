import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../i18n/LanguageContext';
import viewImg from '../public/assets/view.jpg';
import innerViewImg from '../public/assets/inner view.jpg';

const aboutImages = [
  {
    src: viewImg,
    alt: 'Restaurant exterior view',
    span: 'col-span-2 md:col-span-1',
    height: 'h-48 md:h-72',
  },
  {
    src: innerViewImg,
    alt: 'Restaurant interior view',
    span: '',
    height: 'h-48 md:h-72',
  },
  {
    src: viewImg,
    alt: 'Restaurant ambiance',
    span: '',
    height: 'h-48 md:h-60',
  },
  {
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
    alt: 'Dining setup',
    span: 'col-span-2 md:col-span-1',
    height: 'h-48 md:h-60',
  },
];

export default function AboutPreview() {
  const { t } = useLanguage();
  return (
    <section className="bg-gray-900 py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left: Image Gallery Grid */}
          <ScrollReveal className="grid grid-cols-2 gap-4 md:gap-6">
            {aboutImages.map((img) => (
              <div
                key={img.alt}
                className={`${img.span} relative overflow-hidden rounded-2xl border-4 border-gray-800 group shadow-lg shadow-black/20 ${img.height}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </ScrollReveal>

          {/* Right: Text Content */}
          <ScrollReveal delay={200}>
            <div>
              <p className="text-red-500 text-base md:text-lg font-light tracking-[0.3em] uppercase mb-4">
                {t('home.ourStory')}
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {t('home.storyTitle')}
              </h2>
              <div className="w-16 h-1 bg-red-500 mb-6 rounded-full"></div>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8">
                {t('home.storyText')}
              </p>
              <div className="flex flex-wrap gap-4 md:gap-6 mb-8">
                {[
                  { number: '5+', label: t('home.years') },
                  { number: '40+', label: t('home.menuItems') },
                  { number: '10k+', label: t('home.happyGuests') },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-red-500 font-bold text-2xl md:text-3xl">{stat.number}</p>
                    <p className="text-gray-400 text-xs md:text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
              <Link
                to="/reservation"
                className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3.5 rounded-lg font-bold text-base transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg shadow-red-600/30"
              >
                {t('hero.book')}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
