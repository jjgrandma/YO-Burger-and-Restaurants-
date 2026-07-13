import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t('contact.thanks'));
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-950 pt-14 md:pt-[62px] pb-12">
      {/* Hero Section */}
      <div className="bg-gray-900 border-b border-gray-800 py-8 md:py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center text-red-500">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-10 w-10">
              <path strokeLinecap="round" d="M5 9.5h14M4.5 15h15M6 18h12a2 2 0 0 0 2-2v-1H4v1a2 2 0 0 0 2 2ZM5 9.5C5 6.5 8 4 12 4s7 2.5 7 5.5H5Z" />
            </svg>
          </div>
          <p className="text-red-500 text-base md:text-lg font-light tracking-[0.3em] uppercase mb-3">{t('contact.kicker')}</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">{t('contact.title')}</h1>
          <div className="w-16 h-1 bg-red-500 mx-auto mt-4 rounded-full"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* Left Side */}
          <div className="space-y-8 md:space-y-10">
            {/* Arched Frame Image */}
            <div className="relative overflow-hidden rounded-3xl border-8 border-gray-800 group h-64 md:h-96 shadow-xl shadow-black/20">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
                alt="Restaurant interior ambiance"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:opacity-0 transition-opacity duration-300"></div>
            </div>

            {/* Contact Cards */}
            <div className="space-y-5 md:space-y-6">
              {/* Call Us Card */}
              <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 md:p-8 hover:border-red-500 transition-all duration-300 group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center group-hover:bg-red-600/30 transition-colors">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="text-white font-bold text-base md:text-lg uppercase tracking-wider">{t('contact.call')}</h3>
                </div>
                <a href="tel:+251911234567" className="text-red-500 hover:text-red-400 font-bold text-lg md:text-xl transition-colors block mb-2 ml-16">
                  +251 911 234 567
                </a>
                <a href="tel:+251922345678" className="text-red-500 hover:text-red-400 font-bold text-lg md:text-xl transition-colors ml-16">
                  +251 922 345 678
                </a>
              </div>

              {/* Email Us Card */}
              <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 md:p-8 hover:border-red-500 transition-all duration-300 group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center group-hover:bg-red-600/30 transition-colors">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-white font-bold text-base md:text-lg uppercase tracking-wider">{t('contact.email')}</h3>
                </div>
                <a href="mailto:hello@yoburger.et" className="text-red-500 hover:text-red-400 font-bold text-base md:text-lg transition-colors ml-16">
                  hello@yoburger.et
                </a>
              </div>

              {/* Find Us Card */}
              <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 md:p-8 hover:border-red-500 transition-all duration-300 group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center group-hover:bg-red-600/30 transition-colors">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-white font-bold text-base md:text-lg uppercase tracking-wider">{t('contact.find')}</h3>
                </div>
                <a
                  href="https://maps.google.com/?q=G7WC%2BGJG+Adama+Ethiopia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:text-red-400 text-sm md:text-base leading-relaxed ml-16 transition-colors underline underline-offset-2"
                >
                  {t('common.adamaAddress')}
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 md:p-8 lg:p-10 shadow-xl shadow-black/20">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{t('contact.sayHi')}</h2>
            <h2 className="text-2xl md:text-3xl font-bold text-red-500 mb-8">{t('contact.dontBeShy')}</h2>

            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
              <div>
                <label className="block text-white text-sm font-semibold mb-2">{t('form.name')}</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder={t('form.fullName')}
                  className="w-full bg-gray-700 border border-gray-600 focus:border-red-500 text-white px-4 py-3 md:py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all text-sm md:text-base placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-semibold mb-2">{t('form.email')}</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="w-full bg-gray-700 border border-gray-600 focus:border-red-500 text-white px-4 py-3 md:py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all text-sm md:text-base placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-semibold mb-2">{t('form.phone')}</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+251 9XX XXX XXX"
                  className="w-full bg-gray-700 border border-gray-600 focus:border-red-500 text-white px-4 py-3 md:py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all text-sm md:text-base placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-semibold mb-2">{t('form.message')}</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder={t('form.messagePlaceholder')}
                  className="w-full bg-gray-700 border border-gray-600 focus:border-red-500 text-white px-4 py-3 md:py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all resize-none text-sm md:text-base placeholder-gray-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 md:py-4 rounded-lg text-base md:text-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-red-600/30"
              >
                {t('form.send')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
