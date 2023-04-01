import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { i18n } from 'next-i18next';
import ClearIcon from '@mui/icons-material/Clear';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose: onClose, ...other } = props;
  const dir: string = i18n?.dir() || 'ltr';
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={dir === 'ltr' ? {
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          } : {
            position: 'absolute',
            left: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

type CustomizedDialogsProps = {
    title: string,
    children: React.ReactNode,
    isOpen: boolean,
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    onClose: () => void;
}

export default function CustomDialog({title, children, isOpen, size, onClose}: CustomizedDialogsProps) {
  return (
    <div>
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
        maxWidth={size || 'sm'}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
          {title}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {children}
        </DialogContent>
        <DialogActions>
          <Button 
          variant='contained'
          color='secondary'
          autoFocus 
          onClick={onClose}
          size='small'
          startIcon={<ClearIcon />}
          sx={{mx : 2, my: 2}}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}