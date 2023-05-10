import i18next from "i18next";
import i18nextMiddleware  from 'i18next-http-middleware';
import Backend from 'i18next-fs-backend';

class I18nManager {
    t:any;
    init = ({ app }: {app?: any} = {}) => {
      i18next
        .use(Backend)
        .use(i18nextMiddleware.LanguageDetector)
        .init({
          backend: {
            loadPath: "locales/{{lng}}/{{ns}}.json",
          },
          fallbackLng: "en",
          preload: ["en", "es"],
        })
        .then((_t) => (this.t = _t));
  
      if (app) app.use(i18nextMiddleware.handle(i18next));
    };
  }
const i18n = new I18nManager();

  export { i18n };