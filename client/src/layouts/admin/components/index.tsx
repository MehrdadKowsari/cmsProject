import { ReactNode } from "react"

type LayoutProps ={
    children: ReactNode
}
export const Layout = (props: LayoutProps) => {
    const {children} = props;
    return(
        <>
            <main>
                {children}
            </main>
        </>
    )
}