import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
//
import enLocales from './en.json';
import deLocales from './de.json';
import frLocales from './fr.json';
import esLocales from "./es.json"
import hiLocales from "./hi.json"
import maLocales from "./ma.json"
import swLocales from "./sw.json"
// ----------------------------------------------------------------------

let lng = 'en';

if (typeof localStorage !== 'undefined') {
  lng = localStorage.getItem('i18nextLng') || 'en';
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translations: enLocales },
      es: { translations: esLocales },
      hi: { translations: hiLocales },
      ma: { translations: maLocales },
      sw: { translations: swLocales },
      de: { translations: deLocales },
      fr: { translations: frLocales },
    },
    lng,
    fallbackLng: 'en',
    debug: false,
    ns: ['translations'],
    defaultNS: 'translations',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
