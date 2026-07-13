import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

// Beautiful high-res food images from Unsplash — landscape, hero-optimized
const slide1Img = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1920&q=90'; // juicy burger
const slide2Img = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1920&q=90'; // pizza
const slide3Img = 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=1920&q=90'; // cheeseburger

export default function HeroSection() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const heroSlides = [
    {
      image: slide1Img,
      objectPosition: 'center 60%',
      subtitle: t('hero.welcome'),
      title: t('hero.title1'),
      highlight: t('hero.highlight1'),
      description: t('hero.desc1'),
    },
    {
      image: slide2Img,
      objectPosition: 'center center',
      subtitle: t('hero.premium'),
      title: t('hero.title2'),
      highlight: t('hero.highlight2'),
      description: t('hero.desc2'),
    },
    {
      image: slide3Img,
      objectPosition: 'center 55%',
      subtitle: t('hero.crafted'),
      title: t('hero.title3'),
      highlight: t('hero.highlight3'),
      description: t('hero.desc3'),
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const slide = heroSlides[currentSlide];

  return (
    <section className="relative w-full h-screen min-h-[600px] md:min-h-[700px] lg:min-h-screen bg-gray-950 overflow-hidden mt-14 md:mt-[62px]">
      {/* Background Image */}
      <div className="absolute inset-0 transition-all duration-1000 ease-in-out">
        <img
          key={slide.image}
          src={slide.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover scale-110"
          style={{ objectPosition: slide.objectPosition }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/50 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
        <div key={currentSlide} className="animate-fadeInScale">
          <p className="text-red-500 text-sm md:text-lg font-light tracking-[0.3em] uppercase mb-3 md:mb-4">
            {slide.subtitle}
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-2 md:mb-4 leading-tight tracking-tight">
            {slide.title}
            <br className="block" />
            <span className="text-red-500">{slide.highlight}</span>
          </h1>
          <p className="text-gray-300 text-sm md:text-base lg:text-lg max-w-2xl mx-auto mb-8 md:mb-10 font-light">
            {slide.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/menu"
              className="bg-red-600 hover:bg-red-700 text-white px-8 md:px-10 py-3 md:py-4 rounded-lg font-bold text-base md:text-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg shadow-red-600/30 inline-flex items-center gap-2"
            >
              {t('hero.viewMenu')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              to="/reservation"
              className="border-2 border-white/30 hover:border-red-500 text-white hover:text-red-500 px-8 md:px-10 py-3 md:py-4 rounded-lg font-bold text-base md:text-lg transition-all duration-200 transform hover:scale-105"
            >
              {t('hero.book')}
            </Link>
          </div>
        </div>
      </div>

      {/* Carousel Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-3 md:left-8 top-1/2 transform -translate-y-1/2 z-20 bg-red-600/80 hover:bg-red-700 text-white w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-3 md:right-8 top-1/2 transform -translate-y-1/2 z-20 bg-red-600/80 hover:bg-red-700 text-white w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true);
                setCurrentSlide(index);
                setTimeout(() => setIsTransitioning(false), 500);
              }
            }}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'w-8 h-2 bg-red-500'
                : 'w-2 h-2 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
