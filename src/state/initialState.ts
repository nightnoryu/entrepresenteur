import { Editor } from '../model/types';
import { DEFAULT_LOCALE } from '../model/constants';
import { createEditor, createNewPresentation, tryMapStringToLocale } from '../model/modelUtils';

export const LOCALE_KEY = 'locale';

function getInitialState(): Editor {
  let locale = DEFAULT_LOCALE;
  const localeValue = localStorage.getItem(LOCALE_KEY);
  if (localeValue !== null) {
    locale = tryMapStringToLocale(localeValue);
  }

  return createEditor(createNewPresentation(), locale);
}

export default getInitialState;
