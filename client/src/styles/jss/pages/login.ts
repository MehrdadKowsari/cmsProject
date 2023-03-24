import { makeStyles } from "tss-react/mui";
const useStyles = makeStyles()(
    () => ({
        root: {
            marginTop: "100px"
        },
        box: {
            display:"flex",
            justifyContent:"center !important"
        },
        container:{
            maxWidth: "500px"
        },
        typography:{
            flexGrow: 1,
            textAlign: "center",
            paddingTop: "10px !important"
        }
    })
);
export default useStyles;