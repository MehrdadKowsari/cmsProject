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
  styled,
  Icon,
} from '@mui/material';

import ImageWithSkeleton from '../ImageWithSkeleton/ImageWithSkeleton';
import ButtonLink from '../ButtonLink/ButtonLink';
import CommonMessage from 'src/constants/commonMessage';
import { useTranslation } from 'react-i18next';
// type
interface BlogCardProps extends CardProps {
  href?: string;
  likeCount?: number;
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

const BlogCard: React.FunctionComponent<BlogCardProps> = (props) => {
  const {
    children,
    href = '#',
    likeCount = 0,
    imageAlt = '',
    imageSrc = '/',
    title = 'No Title ',
    ...otherProps
  } = props;
  const { t } = useTranslation(['common']);
  return (
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
          <span>{likeCount}</span> <Icon sx={(theme) => ({color: theme.palette.primary.main})}>favorite</Icon>
        </Typography>
        <Box>
          <ButtonLink href={href}>{t("readMore", CommonMessage.ReadMore)}</ButtonLink>
        </Box>
      </CustomCardActions>
    </CustomCard>
  );
};

export default BlogCard;