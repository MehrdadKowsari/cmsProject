import { ReactNode } from "react"

type LayoutProps ={
    children: ReactNode
}
export const AdminLayout = (props: LayoutProps) => {
    const {children} = props;
    return(
        <>
            <main>
                {children}
            </main>
        </>
    )
}