import Icon from "@mui/material/Icon";
import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme) => ({
    titleLine: {
        display: "inline-block",
        borderBottom: `3px solid ${theme.palette.primary.main}`,
        width: "100%",
        position: "relative",
        top: "12px",
        marginBottom: "15px"
    },
    textCont: {
        color: `${theme.palette.primary.main}`,
        position: "absolute",
        top: "-9px",
        right: "10px",
        backgroundColor: "#fff",
        fontSize: "12px",
        padding: "0 5px",
        width: "auto",
    },
    icon: {
        fontSize: "2em"
    },
    text:{
        display: "inline-block",
        verticalAlign: "middle",
        fontSize: "14px",
        marginTop: "-5px",
        marginBottom: "10px",
        marginRight:" 5px",
        marginLeft:" 5px",
        fontWeight: "bold",
    }
}));

type Props = {
    title: string,
    iconCssClass?: string | null
}

const BlockHeader = ({title, iconCssClass}: Props) => {
    const { classes } = styles();
    return(
        <div className={classes.titleLine}>
        <div className={classes.textCont}>
            { iconCssClass && <Icon className={classes.icon}>{iconCssClass}</Icon> }
            <h4 className={classes.text}>{title}</h4>
        </div>
    </div>
    );
}

export default BlockHeader;