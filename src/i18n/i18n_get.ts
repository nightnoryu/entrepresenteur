import { Locale } from '../model/types';
import messages_en_en from './messages_en_en';
import messages_ru_ru from './messages_ru_ru';

function i18n_get(locale: Locale, messageID: string): string {
  const message = getMessage(locale, messageID);
  return message ?? '';
}

function getMessage(locale: Locale, messageID: string): string | undefined {
  switch (locale) {
  case Locale.EN_EN:
    return messages_en_en.get(messageID);
  case Locale.RU_RU:
    return messages_ru_ru.get(messageID);
  }
}

export default i18n_get;
