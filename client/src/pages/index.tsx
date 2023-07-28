import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { PopUpT as Props } from "src/types/popup";
import HomeContent from "src/components/website/HomeContent";
import MainPageLayout from "src/layouts/website/MainPageLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Home: NextPage<Props> = ({ setPopup, popup }) => {
  const { t } = useTranslation();
  return (
    <div>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <meta
          name="description"
          content="Explore the best Blog app"
        ></meta>
        <title>{t("readBlogOnline")}</title>

        <meta property="og:url" content="" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Read Blog Online Free" />
        <meta
          property="og:description"
          content="Read the best Blog app"
        />
        <meta property="og:image" content="" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="" />
        <meta property="twitter:url" content="" />
        <meta name="twitter:title" content="Read Blog Online" />
        <meta
          name="twitter:description"
          content="Explore the best Blog app"
        />
        <meta name="twitter:image" content="" />
      </Head>
      <HomeContent setPopup={setPopup} popup={popup} />
    </div>
  );
};


Home.getLayout = (page: React.ReactNode) => <MainPageLayout>{page}</MainPageLayout>

export default Home;

export const getStaticProps: GetStaticProps<{}> = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  },
})