import React, { useState } from "react";
import useLocale from "src/hooks/useLocale";
import BlockHeader from "../BlockHeader/BlockHeader";
import { useTranslation } from "next-i18next";
import COLORS from "src/constants/colors";
import { Button, TextField } from "@mui/material";
import CommonMessage from "src/constants/commonMessage";
import EmailIcon from "@mui/icons-material/Email";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";

const FooterSubscription: React.FC = () => {
    const [ email, setEmail ] = useState<string>("");
    const { t } = useTranslation();

    const handleEmailChange = (e : React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    }

    const handleSubmit = () => {
      
    }

    return(
        <>
            <BlockHeader title={t("subscribeUs")} iconCssClass="email" bgColor={COLORS.GRAY_LIGTH}/>
            <GridContainer spacing={2}>
              <GridItem>
                <TextField 
                    fullWidth 
                    id="email"
                    label={t("email", CommonMessage.Email)}
                    value={email}
                    onChange={handleEmailChange}/> 
              </GridItem>
              <GridItem textAlign="center">
                <Button 
                type="submit"
                variant="contained"
                name="btnSubmit"
                size="medium"
                title={t("subscribe", CommonMessage.Subscribe)!}
                startIcon={<EmailIcon/>}
                onSubmit={handleSubmit}>
                  <span>{t("subscribe", CommonMessage.Subscribe)!}</span>
                </Button>    
              </GridItem>
            </GridContainer>
        </>
    );
}
export default FooterSubscription;