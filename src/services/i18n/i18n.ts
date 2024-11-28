import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ar from './locale/ar.json'
import de from './locale/de.json'
import en from './locale/en.json'
import es from './locale/es.json'
import fr from './locale/fr.json'
import it from './locale/it.json'
import nl from './locale/nl.json'
import pl from './locale/pl.json'
import pt from './locale/pt.json'

import antEn from 'antd/lib/locale/en_US';
import antArEg from 'antd/lib/locale/ar_EG';
import antDe from 'antd/lib/locale/de_DE';
import antEs from 'antd/lib/locale/es_ES';
import antFr from 'antd/lib/locale/fr_FR';
import antIt from 'antd/lib/locale/it_IT';
import antNl from 'antd/lib/locale/nl_NL';
import antPl from 'antd/lib/locale/pl_PL';
import antPt from 'antd/lib/locale/pt_PT';

export const LANGUAGES = [{
  key: 'en',
  label: 'English',
  name: 'english',
  countryCode: 'US',
  antLocale: antEn
},
{
  key: 'ar',
  label: 'العربية',
  name: 'arabic',
  countryCode: 'EG',
  antLocale: antArEg
},
{
  key: 'de',
  label: 'Deutsch',
  name: 'german',
  countryCode: 'DE',
  antLocale: antDe
},
{
  key: 'es',
  label: 'Español',
  name: 'spanish',
  countryCode: 'ES',
  antLocale: antEs
},
{
  key: 'fr',
  label: 'Français',
  name: 'french',
  countryCode: 'FR',
  antLocale: antFr
},
{
  key: 'it',
  label: 'Italiano',
  name: 'italian',
  countryCode: 'IT',
  antLocale: antIt
},
{
  key: 'nl',
  label: 'Nederlands',
  name: 'dutch',
  countryCode: 'NL',
  antLocale: antNl
},
{
  key: 'pl',
  label: 'Polski',
  name: 'polish',
  countryCode: 'PL',
  antLocale: antPl
},
{
  key: 'pt',
  label: 'Português',
  name: 'portuguese',
  countryCode: 'BR',
  antLocale: antPt
}
]

export const DEFAULT_LOCALE = 'en'



i18n.use(initReactI18next).init({
  resources: {
    ar,
    de,
    en,
    es,
    fr,
    it,
    nl,
    pl,
    pt
  },  // Where we're gonna put translations' files
  lng: DEFAULT_LOCALE,
  interpolation: {
    prefix: '{',
    suffix: '}'
  }    // Set the initial language of the App
});