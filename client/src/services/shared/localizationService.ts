import { parseISO as parseISOJalali } from 'date-fns-jalali';
import { parseISO } from 'date-fns';
import moment from 'jalali-moment';
import { NextRouter } from 'next/router'
import ApplicationParams from 'src/constants/applicationParams';
import { LanguageCodeEnum } from 'src/models/shared/enums/languageCodeEnum';

class LocalizationService {
    
    getLanguageCodeByRouter(router: NextRouter){
        return router?.locale || ApplicationParams.DefaultLanguageCode;
    }

    getLocalDate(date: string | null | undefined, locale?: string | null): string | null{
        try {
            if (!date) {
                return null;
            }
            if (locale === LanguageCodeEnum.Persian) {
                return moment(date).format('jYYYY/jMM/jDD')
            } else {
                return moment(date).format('DD/MM/YYYY')
            }
        } catch (error) {
            return null;
        }
    }
    
    getLocalDateTime(dateTime: string | null | undefined, locale?: string | null): string | null{
        if (!dateTime) {
            return null;
        }
        if (locale === LanguageCodeEnum.Persian) {
            return moment(dateTime).format('jYYYY/jMM/jDD HH:MM')
        } else {
            return moment(dateTime).format('DD/MM/YYYY HH:MM')
        }
    }

    parseDateTime(dateTime: string | null | Date, locale?: string | null): Date | null{
       try {
        if (!dateTime) {
            return null;
        }
        const formattedDate = locale === LanguageCodeEnum.Persian ? parseISOJalali(dateTime.toString()) : parseISO(dateTime.toString())
        return formattedDate;
       } catch (error) {
        return null;
       }
    }

    getCurrentYear(locale: string): string{
        if (locale === LanguageCodeEnum.Persian) {
            return moment(new Date()).format('jYYYY')
        } else {
            return moment(new Date()).format('YYYY')
        }
    }
}

export default new LocalizationService();