import { useTranslation } from 'react-i18next';
// @mui
import { enUS, deDE, frFR, hiIN, esES, arEG, arSD } from '@mui/material/locale';

// ----------------------------------------------------------------------

const LANGS = [
  {
    label: 'English',
    value: 'en',
    systemValue: enUS,
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/ic_flag_en.svg',
  },
  {
    label: "Hindi",
    value: 'hi',
    systemValue: hiIN,
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/ic_flag_en.svg',
  },
  {
    label: "Marathi",
    value: 'ma',
    systemValue: hiIN,
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/ic_flag_en.svg',
  },
  {
    label: "Spanish",
    value: 'es',
    systemValue: esES,
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/ic_flag_en.svg',
  },
  {
    label: "Arabic",
    value: 'ar',
    systemValue: arEG,
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/ic_flag_en.svg',
  },
  {
    label: "Swaheli",
    value: 'sw',
    systemValue: arSD,
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/ic_flag_en.svg',
  },
  {
    label: 'German',
    value: 'de',
    systemValue: deDE,
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/ic_flag_de.svg',
  },
  {
    label: 'French',
    value: 'fr',
    systemValue: frFR,
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/ic_flag_fr.svg',
  },

];

export default function useLocales() {
  const { i18n, t: translate } = useTranslation();
  const langStorage = localStorage.getItem('i18nextLng');
  const currentLang = LANGS.find((_lang) => _lang.value === langStorage) || LANGS[1];

  const handleChangeLanguage = (newlang: string) => {
    i18n.changeLanguage(newlang);
  };

  return {
    onChangeLang: handleChangeLanguage,
    translate,
    currentLang,
    allLang: LANGS,
  };
}
