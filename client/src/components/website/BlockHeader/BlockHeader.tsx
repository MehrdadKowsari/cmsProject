import Icon from "@mui/material/Icon";
import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme) => ({
    title: {
        display: "inline-block",
        borderBottom: `3px solid ${theme.palette.primary.main}`,
        width: "100%",
        position: "relative",
        top: "12px"
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
        marginBottom: "15px",
        marginRight:" 5px",
        fontWeight: "bold",
    }
}));

type Props = {
    title: string,
    iconCssClass: string
}

const BlockHeader = ({title, iconCssClass}: Props) => {
    const { classes } = styles();
    return(
        <div className={classes.title}>
        <div className={classes.textCont}>
            <Icon className={classes.icon}>{iconCssClass}</Icon>
            <h4 className={classes.text}>{title}</h4>
        </div>
    </div>
    );
}

export default BlockHeader;