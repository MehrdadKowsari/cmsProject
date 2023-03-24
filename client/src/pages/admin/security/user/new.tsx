import UserLayout from "src/layouts/admin/UserLayout";
import { AppProps } from "next/app";
import UserForm from "./form";

const NewUser = ({Component, pageProps}: AppProps) =>{
    return(
        <>
            {/* <UserForm /> */}
        </>
    )
}
NewUser.getLayout = (page: React.ReactNode) => <UserLayout>{page}</UserLayout>
export default NewUser;