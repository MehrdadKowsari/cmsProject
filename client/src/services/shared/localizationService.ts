import moment from 'jalali-moment';
import { NextRouter } from 'next/router'
import ApplicationParams from 'src/constants/applicationParams';
import { LanguageCodeEnum } from 'src/models/shared/enums/languageCodeEnum';

class LocalizationService {
    
    getLanguageCodeByRouter(router: NextRouter){
        return router?.locale || ApplicationParams.DefaultLanguageCode;
    }

    getLocalDate(date: string, locale: string): string | null{
        if (!date) {
            return null;
        }
        if (locale === LanguageCodeEnum.Persian) {
            return moment(date).format('jYYYY/jMM/jDD')
        } else {
            return moment(date).format('DD/MM/YYYY')
        }
    }
    
    getLocalDateTime(dateTime: string, locale: string): string | null{
        if (!dateTime) {
            return null;
        }
        if (locale === LanguageCodeEnum.Persian) {
            return moment(dateTime).format('jYYYY/jMM/jDD HH:MM')
        } else {
            return moment(dateTime).format('DD/MM/YYYY HH:MM')
        }
    }
}

export default new LocalizationService();