import { DEFAULT_LANGUAGE } from '../../common/contants/contants';
import { createI18n } from 'vue-i18n';
import messages from './message';

const i18n = createI18n({
    locale: DEFAULT_LANGUAGE, // set locale
    fallbackLocale: DEFAULT_LANGUAGE, // set fallback locale
    messages, // set locale messages
    globalInjection: true,
    legacy: false,
    sync: true,
});

export default i18n;
