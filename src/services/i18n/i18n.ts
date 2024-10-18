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

export const LANGUAGES = [{
  key: 'en',
  label: 'English',
  name: 'english',
  countryCode: 'US',
},
{
  key: 'ar',
  label: 'العربية',
  name: 'arabic',
  countryCode: 'EG',
},
{
  key: 'de',
  label: 'Deutsch',
  name: 'german',
  countryCode: 'DE',
},
{
  key: 'es',
  label: 'Español',
  name: 'spanish',
  countryCode: 'ES',
},
{
  key: 'fr',
  label: 'Français',
  name: 'french',
  countryCode: 'FR',
},
{
  key: 'it',
  label: 'Italiano',
  name: 'italian',
  countryCode: 'IT',
},
{
  key: 'nl',
  label: 'Nederlands',
  name: 'dutch',
  countryCode: 'NL',
},
{
  key: 'pl',
  label: 'Polski',
  name: 'polish',
  countryCode: 'PL',
},
{
  key: 'pt',
  label: 'Português',
  name: 'portuguese',
  countryCode: 'BR',
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