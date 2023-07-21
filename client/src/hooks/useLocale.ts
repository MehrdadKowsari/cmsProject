import { useRouter } from "next/router";
import ApplicationParams from "src/constants/applicationParams";

const useLocale = () => {
    const router  = useRouter();
    const getLocale = () => {
        return router.locale ?? ApplicationParams.DefaultLanguageCode;
    }

    return { getLocale };
}

export default useLocale;