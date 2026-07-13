import ScrollReveal from '../components/ScrollReveal';
import { useLanguage } from '../i18n/LanguageContext';

const teamMembers = [
  { name: 'Yohannes Alemu', role: 'Master Chef', image: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=400&q=80' },
  { name: 'Selam Tesfaye', role: 'Pastry Chef', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80' },
  { name: 'Biruk Mengistu', role: 'Sous Chef', image: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&q=80' },
];

const galleryImages = [
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80',
  'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80',
  'https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=600&q=80',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80',
  'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&q=80',
];

export default function AboutPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-gray-950 pt-14 md:pt-[62px] pb-12">
      {/* Hero Section */}
      <div className="relative bg-cover bg-center py-16 md:py-20 px-4" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80)',
      }}>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <p className="text-red-500 text-base md:text-lg font-light tracking-[0.3em] uppercase mb-3">{t('about.kicker')}</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">{t('about.title')}</h1>
          <div className="w-16 h-1 bg-red-500 mx-auto mt-4 rounded-full"></div>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <ScrollReveal>
            {/* ── Video Player ── */}
            <div className="relative rounded-2xl border-4 border-gray-800 shadow-xl shadow-black/20 overflow-hidden bg-black">
              <video
                className="w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                controls
                style={{ maxHeight: '480px' }}
              >
                <source src="/assets/ourStory.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Red accent corners */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-red-500 rounded-tl-lg pointer-events-none" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-red-500 rounded-tr-lg pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-red-500 rounded-bl-lg pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-red-500 rounded-br-lg pointer-events-none" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div>
              <p className="text-red-500 text-base md:text-lg font-light tracking-[0.3em] uppercase mb-3">{t('home.ourStory')}</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {t('about.rareTaste')}
              </h2>
              <div className="w-16 h-1 bg-red-500 mb-6 rounded-full"></div>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-6">
                {t('about.p1')}
              </p>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                {t('about.p2')}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="bg-gray-900 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            <ScrollReveal>
              <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 md:p-10 hover:border-red-500 transition-all duration-300 group h-full">
                <div className="w-14 h-14 bg-red-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-600/30 transition-colors">
                  <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{t('about.mission')}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {t('about.missionText')}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 md:p-10 hover:border-red-500 transition-all duration-300 group h-full">
                <div className="w-14 h-14 bg-red-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-600/30 transition-colors">
                  <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{t('about.vision')}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {t('about.visionText')}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Team Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <ScrollReveal>
          <div className="text-center mb-12 md:mb-16">
            <p className="text-red-500 text-base md:text-lg font-light tracking-[0.3em] uppercase mb-3">{t('about.team')}</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">{t('about.teamTitle')}</h2>
            <div className="w-16 h-1 bg-red-500 mx-auto mt-4 rounded-full"></div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {teamMembers.map((member, index) => (
            <ScrollReveal key={member.name} delay={index * 150}>
              <div className="text-center group cursor-pointer">
                <div className="mb-6">
                  <div className="w-48 h-48 md:w-56 md:h-56 mx-auto relative overflow-hidden rounded-full border-4 border-gray-800 group-hover:border-red-500 transition-all duration-500 shadow-xl shadow-black/30">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors">
                  {member.name}
                </h3>
                <p className="text-red-500 font-semibold text-sm md:text-base">{member.role}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="bg-gray-900 py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12 md:mb-16">
              <p className="text-red-500 text-base md:text-lg font-light tracking-[0.3em] uppercase mb-3">{t('footer.gallery')}</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">{t('about.galleryTitle')}</h2>
              <div className="w-16 h-1 bg-red-500 mx-auto mt-4 rounded-full"></div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {galleryImages.map((img, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <div className="relative overflow-hidden rounded-xl border-2 border-gray-800 group shadow-lg shadow-black/20">
                  <div className="h-48 md:h-64">
                    <img
                      src={img}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                      loading="lazy"
                    />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
