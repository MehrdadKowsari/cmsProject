import { useRouter } from "next/router";

const useLocale = () => {
    const router  = useRouter();
    const getLocale = () => {
        return router.locale;
    }

    return { getLocale };
}

export default useLocale;