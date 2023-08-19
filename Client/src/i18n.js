import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en.json';
import viTranslation from './locales/vi.json';

// Cấu hình i18next
i18n.use(initReactI18next).init({
  lng: 'vi', // Ngôn ngữ mặc định
  fallbackLng: 'vi', // Ngôn ngữ dự phòng nếu ngôn ngữ hiện tại không có dịch
  debug: true, // Bật chế độ debug

  interpolation: {
    escapeValue: false, // Không tự động thoát các ký tự đặc biệt trong các chuỗi dịch
  },

  resources: {
    en: {
      translation: enTranslation,
    },
    vi: {
      translation: viTranslation,
    },
  },
});

export default i18n;
