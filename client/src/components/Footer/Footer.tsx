import { Box, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next';
import React from 'react'
import useLocale from 'src/hooks/useLocale';
import localizationService from 'src/services/shared/localizationService';

const Footer = () => {
  const { t } = useTranslation();
  const { getLocale } = useLocale();
  const currentYear = localizationService.getCurrentYear(getLocale());
  return (
    <Box>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        {t("allRightsReserved")}{" "} {t("copyright")} © {currentYear}
        </Typography>
    </Box>
  )
}

export default Footer