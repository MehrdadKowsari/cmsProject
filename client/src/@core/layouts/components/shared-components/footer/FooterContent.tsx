import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'next-i18next'
import useLocale from 'src/hooks/useLocale'
import localizationService from 'src/services/shared/localizationService'

const FooterContent = () => {
  const { t } = useTranslation();
  const { getLocale } = useLocale();
  const currentYear = localizationService.getCurrentYear(getLocale());

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography sx={{ mr: 2 }}>
      {t("allRightsReserved")}{" "} {t("copyright")} © {currentYear}
      </Typography>
    </Box>
  )
}

export default FooterContent
