import React, { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import CookieIcon from '@mui/icons-material/Cookie';
import { Text, CookiesBox, Button } from "./styles";
import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme) => ({
  primaryIcon: {
    color: theme.palette.primary.main,
    fontSize: "2rem"
  },
}));

const Cookies: React.FC = () => {
  const { t } = useTranslation();
  const [allowedCookies, setAllowedCookies] = useState(true);
  const { classes }= styles();
  useEffect(() => {
    return setAllowedCookies(
      localStorage?.getItem("allowedCookies") === "true"
    );
  }, []);
  return (
    <>
      {allowedCookies ? (
        ""
      ) : (
        <CookiesBox>
          <CookieIcon className={classes.primaryIcon} />
          <Text>{t("cookieText")}</Text>
          <Button
            onClick={() => {
              setAllowedCookies(true);
              localStorage.setItem("allowedCookies", "true");
            }}
          >
            {t("ok")}
          </Button>
        </CookiesBox>
      )}
    </>
  );
};

export default Cookies;
