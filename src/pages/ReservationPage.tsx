import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

interface FormData {
  name: string;
  phone: string;
  persons: string;
  date: string;
  time: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  date?: string;
  time?: string;
}

export default function ReservationPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    persons: '2 People',
    date: '',
    time: '19:00',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t('form.requiredName');
    } else if (formData.name.trim().length < 2) {
      newErrors.name = t('form.shortName');
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t('form.requiredPhone');
    } else if (!/^[\d\s\+\-\(\)]{7,20}$/.test(formData.phone)) {
      newErrors.phone = t('form.invalidPhone');
    }

    if (!formData.date) {
      newErrors.date = t('form.requiredDate');
    } else {
      const selected = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        newErrors.date = t('form.pastDate');
      }
    }

    if (!formData.time) {
      newErrors.time = t('form.requiredTime');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
      // Reset form
      setFormData({
        name: '',
        phone: '',
        persons: '2 People',
        date: '',
        time: '19:00',
        message: '',
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 pt-14 md:pt-[62px] pb-12">
      {/* Hero Section */}
      <div className="bg-gray-900 border-b border-gray-800 py-8 md:py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-500 text-base md:text-lg font-light tracking-[0.3em] uppercase mb-3">
            {t('reservation.kicker')}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">{t('reservation.title')}</h1>
          <div className="w-16 h-1 bg-red-500 mx-auto mt-4 rounded-full"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Reservation Form */}
          <div className="lg:col-span-2">
            {isSubmitted && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6 text-green-400 text-sm animate-fadeInScale">
                {t('reservation.success')}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              {/* Name Input */}
              <div>
                <label className="block text-white text-sm md:text-base font-semibold mb-2">{t('form.name')} *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t('form.fullName')}
                  className={`w-full bg-gray-800 border ${
                    errors.name ? 'border-red-500' : 'border-gray-700'
                  } focus:border-red-500 text-white px-4 py-3 md:py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all text-sm md:text-base placeholder-gray-500`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Phone Input */}
              <div>
                <label className="block text-white text-sm md:text-base font-semibold mb-2">{t('form.phone')} *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+251 9XX XXX XXX"
                  className={`w-full bg-gray-800 border ${
                    errors.phone ? 'border-red-500' : 'border-gray-700'
                  } focus:border-red-500 text-white px-4 py-3 md:py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all text-sm md:text-base placeholder-gray-500`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              {/* Two Column Row: Persons & Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-white text-sm md:text-base font-semibold mb-2">{t('form.people')}</label>
                  <select
                    name="persons"
                    value={formData.persons}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 focus:border-red-500 text-white px-4 py-3 md:py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all text-sm md:text-base"
                  >
                    {['1 Person', '2 People', '3 People', '4 People', '5 People', '6+ People'].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white text-sm md:text-base font-semibold mb-2">{t('form.date')} *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={`w-full bg-gray-800 border ${
                      errors.date ? 'border-red-500' : 'border-gray-700'
                    } focus:border-red-500 text-white px-4 py-3 md:py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all text-sm md:text-base`}
                  />
                  {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                </div>
              </div>

              {/* Time Input */}
              <div>
                <label className="block text-white text-sm md:text-base font-semibold mb-2">{t('form.time')} *</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className={`w-full bg-gray-800 border ${
                    errors.time ? 'border-red-500' : 'border-gray-700'
                  } focus:border-red-500 text-white px-4 py-3 md:py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all text-sm md:text-base`}
                />
                {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
              </div>

              {/* Message Textarea */}
              <div>
                <label className="block text-white text-sm md:text-base font-semibold mb-2">{t('form.messageOptional')}</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder={t('form.specialRequests')}
                  className="w-full bg-gray-800 border border-gray-700 focus:border-red-500 text-white px-4 py-3 md:py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all resize-none text-sm md:text-base placeholder-gray-500"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 md:py-4 rounded-lg text-base md:text-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-red-600/30"
              >
                {t('hero.book')}
              </button>
            </form>
          </div>

          {/* Contact Info Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 md:p-8 space-y-8 sticky top-28 shadow-xl shadow-black/20">
              {/* Phone */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="text-white font-bold text-sm uppercase tracking-wider">{t('reservation.request')}</h3>
                </div>
                <a href="tel:+251911234567" className="text-red-500 hover:text-red-400 font-bold text-lg md:text-xl transition-colors ml-[52px]">
                  +251 911 234 567
                </a>
              </div>

              {/* Location */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-white font-bold text-sm uppercase tracking-wider">{t('reservation.location')}</h3>
                </div>
                <a
                  href="https://maps.google.com/?q=G7WC%2BGJG+Adama+Ethiopia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:text-red-400 text-sm md:text-base leading-relaxed ml-[52px] transition-colors underline underline-offset-2"
                >
                  {t('common.adamaAddress')}
                </a>
              </div>

              {/* Lunch Hours */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-white font-bold text-sm uppercase tracking-wider">{t('reservation.lunch')}</h3>
                </div>
                <p className="text-gray-400 text-sm md:text-base ml-[52px]">
                  {t('footer.everyday')}<br />11:00 am - 2:30 pm
                </p>
              </div>

              {/* Dinner Hours */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  </div>
                  <h3 className="text-white font-bold text-sm uppercase tracking-wider">{t('reservation.dinner')}</h3>
                </div>
                <p className="text-gray-400 text-sm md:text-base ml-[52px]">
                  {t('footer.everyday')}<br />5:30 pm - 11:30 pm
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
