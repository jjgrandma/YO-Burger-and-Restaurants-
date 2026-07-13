import { useState, useMemo } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { useLanguage } from '../i18n/LanguageContext';
import boomImg from '../public/assets/boom.jpg';
import menuHeroImg from '../public/assets/menu.jpg';

interface MenuItem {
  name: string;
  description: string;
  price: string;
  image: string;
  isNew?: boolean;
  category: string;
}

const menuItems: MenuItem[] = [
  // STARTERS
  { name: 'SPICED POTATO WEDGES', description: 'Crispy potato wedges with house spice and garlic dip.', price: 'ETB 220', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80', category: 'STARTERS', isNew: true },
  { name: 'GARLIC MUSHROOMS', description: 'Sauteed mushrooms with garlic butter and fresh herbs.', price: 'ETB 240', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80', category: 'STARTERS' },
  { name: 'FRESH GARDEN SALAD', description: 'Crisp greens, tomato, cucumber, onion, and house dressing.', price: 'ETB 210', image: boomImg, category: 'STARTERS' },
  { name: 'LOADED FRIES', description: 'Hand-cut fries with cheese, peppers, and YO sauce.', price: 'ETB 260', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80', category: 'STARTERS' },
  { name: 'CRISPY CHICKEN BITES', description: 'Golden chicken bites with a choice of dipping sauce.', price: 'ETB 290', image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&q=80', category: 'STARTERS' },
  // BURGERS
  { name: 'YO CLASSIC BURGER', description: 'Grilled beef patty, cheese, lettuce, tomato, onion, and signature sauce.', price: 'ETB 390', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80', category: 'BURGERS', isNew: true },
  { name: 'DOUBLE SMASH BURGER', description: 'Two beef patties, double cheese, caramelized onion, and house sauce.', price: 'ETB 520', image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&q=80', category: 'BURGERS' },
  { name: 'SPICY ADAMA BURGER', description: 'Beef patty, local green chili, cheese, tomato, and spicy YO sauce.', price: 'ETB 430', image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&q=80', category: 'BURGERS' },
  { name: 'GRILLED CHICKEN BURGER', description: 'Marinated chicken, crisp lettuce, tomato, pickles, and garlic sauce.', price: 'ETB 360', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80', category: 'BURGERS' },
  { name: 'VEGGIE CRUNCH BURGER', description: 'Crispy vegetable patty, fresh salad, pickles, and herb sauce.', price: 'ETB 320', image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&q=80', category: 'BURGERS' },
  // SPECIAL
  { name: 'YO FAMILY BOX', description: 'Four classic burgers, loaded fries, wings, and four soft drinks.', price: 'ETB 1650', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80', category: 'SPECIAL', isNew: true },
  { name: 'ETHIOPIAN GRILL PLATE', description: 'Seasoned grilled beef, vegetables, fries, and house sauce.', price: 'ETB 580', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80', category: 'SPECIAL' },
  { name: 'GRILLED CHICKEN PLATE', description: 'Marinated chicken, garden salad, fries, and garlic sauce.', price: 'ETB 460', image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=400&q=80', category: 'SPECIAL' },
  { name: 'CRISPY WINGS', description: 'Crispy chicken wings tossed in your choice of signature sauce.', price: 'ETB 390', image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&q=80', category: 'SPECIAL' },
  { name: 'YO COMBO', description: 'Classic burger, fries, crispy wings, and a soft drink.', price: 'ETB 620', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80', category: 'SPECIAL' },
  // DESSERTS
  { name: 'CHOCOLATE CAKE', description: 'Rich chocolate cake with vanilla ice cream.', price: 'ETB 240', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80', category: 'DESSERTS', isNew: true },
  { name: 'CARAMEL CUSTARD', description: 'Smooth vanilla custard with caramel sauce.', price: 'ETB 210', image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400&q=80', category: 'DESSERTS' },
  { name: 'COFFEE TIRAMISU', description: 'Coffee-soaked cake, cream, and cocoa.', price: 'ETB 230', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80', category: 'DESSERTS' },
  { name: 'YO CHEESECAKE', description: 'Creamy cheesecake with seasonal fruit sauce.', price: 'ETB 230', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&q=80', category: 'DESSERTS' },
  { name: 'APPLE TART', description: 'Warm caramelized apple tart with vanilla ice cream.', price: 'ETB 240', image: 'https://images.unsplash.com/photo-1562007908-17c67e878c88?w=400&q=80', category: 'DESSERTS' },
];

type SortOption = 'name' | 'price-low' | 'price-high';

export default function MenuPage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('STARTERS');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const categories = [
    { key: 'STARTERS', label: t('category.starters') },
    { key: 'BURGERS', label: t('category.burgers') },
    { key: 'SPECIAL', label: t('category.special') },
    { key: 'DESSERTS', label: t('category.desserts') },
  ];

  const filteredAndSortedItems = useMemo(() => {
    let items = menuItems.filter(
      (item) =>
        item.category === activeCategory &&
        (searchQuery === '' || item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    switch (sortBy) {
      case 'name':
        items.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-low':
        items.sort((a, b) => parseFloat(a.price.replace(/[^\d.]/g, '')) - parseFloat(b.price.replace(/[^\d.]/g, '')));
        break;
      case 'price-high':
        items.sort((a, b) => parseFloat(b.price.replace(/[^\d.]/g, '')) - parseFloat(a.price.replace(/[^\d.]/g, '')));
        break;
    }

    return items;
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-gray-950 pt-14 md:pt-[62px] pb-12">
      {/* Hero Section */}
      <div className="relative bg-cover bg-center py-16 md:py-20 px-4" style={{
        backgroundImage: `url(${menuHeroImg})`,
      }}>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <p className="text-red-500 text-base md:text-lg font-light tracking-[0.3em] uppercase mb-3">{t('menu.browse')}</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">{t('menu.title')}</h1>
          <div className="w-16 h-1 bg-red-500 mx-auto mt-4 rounded-full"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Search & Sort Bar */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder={t('menu.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 focus:border-red-500 text-white px-4 py-3 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all text-sm"
            />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/30 text-sm"
          >
            <option value="name">{t('menu.sortName')}</option>
            <option value="price-low">{t('menu.sortLow')}</option>
            <option value="price-high">{t('menu.sortHigh')}</option>
          </select>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-3 md:gap-4 mb-12 md:mb-16 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-bold text-sm md:text-base transition-all duration-200 ${
                activeCategory === cat.key
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                  : 'border-2 border-gray-700 text-gray-300 hover:border-red-500 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="space-y-5 md:space-y-6">
          {filteredAndSortedItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">{t('menu.noItems')}</p>
            </div>
          ) : (
            filteredAndSortedItems.map((item, index) => (
              <ScrollReveal key={item.name} delay={index * 80}>
                <div className="bg-gray-800 hover:bg-gray-750 border border-gray-700 hover:border-red-500 rounded-2xl p-5 md:p-6 transition-all duration-300 group shadow-lg shadow-black/10">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 items-start">
                    {/* Item Image */}
                    <div className="md:col-span-1 relative overflow-hidden rounded-xl">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-40 md:h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      {item.isNew && (
                        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                          {t('menu.new')}
                        </div>
                      )}
                    </div>

                    {/* Item Details */}
                    <div className="md:col-span-2">
                      <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-gray-400 text-sm md:text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Price & Action */}
                    <div className="md:col-span-1 flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-3 md:gap-4">
                      <span className="text-red-500 font-bold text-2xl md:text-3xl">{item.price}</span>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-bold text-sm transition-all duration-200 transform hover:scale-105 active:scale-95">
                        {t('menu.add')}
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
