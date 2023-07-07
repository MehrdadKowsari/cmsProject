import moment from 'jalali-moment';
import { useRouter } from 'next/router'

class LocalizationService {
    getLocalDate(date: string, locale: string): string | null{
        if (!date) {
            return null;
        }
        if (locale === 'fa') {
            return moment(date).format('jYYYY/jMM/jDD')
        } else {
            return moment(date).format('DD/MM/YYYY')
        }
    }
}

export default new LocalizationService();