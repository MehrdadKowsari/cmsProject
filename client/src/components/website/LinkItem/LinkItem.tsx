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
import Link from 'next/link';


// type
type LinkItemProps = {
  href?: string;
  target?: string;
  iconCssClass?: string | null;
  title: string;
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


const LinkItem: React.FunctionComponent<LinkItemProps> = (props) => {
  const {
    href = '#',
    iconCssClass = 'arrow_left',
    target = '_self',
    title
  } = props;
  return (
   <>
      <Link href={href} target={target} passHref><Icon sx={(theme) => ({color: theme.palette.primary.main})}>{iconCssClass}</Icon> {title}</Link>  
   </>
  );
};

export default LinkItem;