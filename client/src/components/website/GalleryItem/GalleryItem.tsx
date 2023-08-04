// react
import * as React from 'react';
// @mui
import {
  Box,
  BoxProps,
  Card,
  CardProps,
  CardActions,
  CardActionsProps,
  Typography,
  styled
} from '@mui/material';

import ImageWithSkeleton from '../ImageWithSkeleton/ImageWithSkeleton';
import ButtonLink from '../ButtonLink/ButtonLink';
import CommonMessage from 'src/constants/commonMessage';
import { useTranslation } from 'react-i18next';
import GridItem from '../Grid/GridItem';
// type
interface GalleryItemProps extends CardProps {
  href?: string;
  imageAlt?: string;
  imageSrc?: string | null;
  title?: string;
}

const CustomCard = styled(Card)<CardProps>(({ theme }) => ({
  padding: '1rem 1rem 0.5rem',
}));

const CustomCardContent = styled(Box)<BoxProps>(({ theme }) => ({
  borderRadius: '4px',
  height: '21rem',
  marginBottom: '0.5rem',
  overflow: 'hidden',
  position: 'relative',
  width: '100%',
  img: {
    transform: 'scale(1)',
    transition: 'transform 0.5s ease-in-out',
  },
  '&: hover': {
    img: {
      transform: 'scale(1.2)',
      transition: 'transform 0.5s ease-in-out',
    },
  },
}));

const CardTitleWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  borderRadius: theme.shape.borderRadius,
  bottom: 0,
  height: '40%',
  overflow: 'hidden',
  padding: '0.5rem',
  position: 'absolute',
  width: '100%',
}));

const CustomCardActions = styled(CardActions)<CardActionsProps>(
  ({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0',
  })
);

const GalleryItem: React.FunctionComponent<GalleryItemProps> = (props) => {
  const {
    children,
    href = '#',
    imageAlt = '',
    imageSrc = '/',
    title = 'No Title ',
    ...otherProps
  } = props;
  const { t } = useTranslation(['common']);
  return (
      <GridItem data-src={href} lg={3} md={3} sm={3} xs={6}>
      <CustomCard {...otherProps}>
      <CustomCardContent>
        <ImageWithSkeleton
          alt={imageAlt}
          src={imageSrc || ''}
          layout="fill"
          objectFit="cover"
        />
        <CardTitleWrapper>
          <Typography component="h2" variant="h5" color="text.secondary">
            {title}
          </Typography>
        </CardTitleWrapper>
      </CustomCardContent>
      <CustomCardActions>
        <Typography
          color="text.secondary"
          component="p"
          fontSize="small"
          variant="body1"
        >         
        </Typography>
        <Box>
          <ButtonLink href={href}>{t("view", CommonMessage.View)}</ButtonLink>
        </Box>
      </CustomCardActions>
    </CustomCard>
    </GridItem>
  );
};

export default GalleryItem;