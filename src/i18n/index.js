/*
 * @Descripttion:
 * @version:
 * @Author: 程
 * @Date: 2022-11-09 09:33:20
 * @LastEditors: 程
 * @LastEditTime: 2022-11-09 09:46:12
 */
import { createI18n } from 'vue-i18n';

import ZH from './zh';
import EN from './en';

const message = {
  zh: {
    ...ZH,
  },
  en: {
    ...EN,
  },
};

const getCurrentLanguage = () => {
  const UAlang = navigator.language;
  const langCode = UAlang.indexOf('zh') == -1 ? 'zh' : ' en';
  localStorage.getItem('lang', langCode);
  return langCode;
};

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: getCurrentLanguage() || 'zh',
  messages: message,
});

export default i18n;
