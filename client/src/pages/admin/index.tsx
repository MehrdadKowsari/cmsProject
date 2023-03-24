import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ReactNode } from 'react';
import UserLayout from 'src/layouts/admin/UserLayout';

const Admin = () =>{
    return (
        <>
        </>
    )
}

Admin.getLayout = (page: ReactNode) => <UserLayout>{page}</UserLayout>

export default Admin;
type AdminProps = {

}
export const getStaticProps: GetStaticProps<AdminProps> = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  },
})