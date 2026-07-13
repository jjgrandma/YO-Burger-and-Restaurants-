import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const quickLinks = [
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.chefs'), path: '/chefs' },
    { name: t('footer.ourMenu'), path: '/menu' },
    { name: t('footer.gallery'), path: '/about' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 pb-8 md:pb-12 border-b border-gray-800">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="text-red-500 text-xl">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
                  <path strokeLinecap="round" d="M5 9.5h14M4.5 15h15M6 18h12a2 2 0 0 0 2-2v-1H4v1a2 2 0 0 0 2 2ZM5 9.5C5 6.5 8 4 12 4s7 2.5 7 5.5H5Z" />
                  <path strokeLinecap="round" d="M7 12h10" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg tracking-wide">{t('brand.name')}</h3>
                <p className="text-red-500 text-[10px] font-semibold tracking-[0.16em]">{t('brand.location')}</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {t('footer.description')}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-6 uppercase tracking-wider">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-red-500 text-sm transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-red-500 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-white font-bold text-base mb-6 uppercase tracking-wider">{t('footer.contact')}</h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">{t('footer.phone')}</p>
                <a href="tel:+251911234567" className="text-gray-300 hover:text-red-500 text-sm transition-colors block">
                  +251 911 234 567
                </a>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">{t('footer.email')}</p>
                <a href="mailto:hello@yoburger.et" className="text-gray-300 hover:text-red-500 text-sm transition-colors block">
                  hello@yoburger.et
                </a>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">{t('footer.address')}</p>
                <a
                  href="https://maps.google.com/?q=G7WC%2BGJG+Adama+Ethiopia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-400 hover:text-red-300 text-sm transition-colors underline underline-offset-2"
                >
                  {t('common.adamaAddress')}
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Hours & Social */}
          <div>
            <h3 className="text-white font-bold text-base mb-6 uppercase tracking-wider">{t('footer.hours')}</h3>
            <div className="space-y-4 mb-6">
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">{t('footer.lunch')}</p>
                <p className="text-gray-300 text-sm">{t('footer.everyday')}: 11:00 am - 2:30 pm</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">{t('footer.dinner')}</p>
                <p className="text-gray-300 text-sm">{t('footer.everyday')}: 5:30 pm - 11:30 pm</p>
              </div>
            </div>
            <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">{t('footer.follow')}</h3>
            <div className="flex gap-3">
              {[
                { name: 'Facebook', icon: 'f', color: 'hover:bg-blue-600' },
                { name: 'Instagram', icon: 'IG', color: 'hover:bg-pink-600' },
                { name: 'Twitter', icon: '𝕏', color: 'hover:bg-gray-600' },
                { name: 'YouTube', icon: 'YT', color: 'hover:bg-red-600' },
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className={`w-10 h-10 bg-gray-800 ${social.color} rounded-full flex items-center justify-center text-white text-sm transition-all duration-300 transform hover:scale-110 hover:shadow-lg`}
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="text-center pt-8 md:pt-12">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} <span className="text-white font-medium">{t('brand.name')}</span>. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
