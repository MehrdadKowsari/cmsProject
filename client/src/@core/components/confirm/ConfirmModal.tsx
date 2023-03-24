import React from 'react';
// material-ui components
import withStyles from "@mui/material/styles/withStyles";
import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import Button from '@mui/material/Button';

//import { makeStyles } from '@mui/styles';

// @mui/icons
import Close from "@mui/icons-material/Close";
// core components


import modalStyle from "../../../styles/jss/components/confirm/modalStyle";
import useConfirm from 'src/state/hooks/useConfirm';
import { TransitionProps } from '@mui/material/transitions/transition';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});


export default function ConfirmModal() {
  const { onConfirm, onCancel, confirmState } = useConfirm();
  //const useStyles = makeStyles(modalStyle);
  //const classes = useStyles();
  return (
    <>
        <Dialog
        classes={{
          //paper: classes.modal
        }}
        open={confirmState?.show}
        TransitionComponent={Transition}
        keepMounted
        onClose={onCancel}
        aria-labelledby="modal-slide-title"
        aria-describedby="modal-slide-description"
      >
        {/* <DialogTitle
          id="classic-modal-slide-title"
          className={classes.modalHeader}
        >
          <IconButton
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={onCancel}
          >
            <Close className={classes.modalClose} />
          </IconButton>
          <p className={classes.modalTitle}>Confirm</p>
        </DialogTitle>
        <DialogContent
          id="modal-slide-description"
          className={classes.modalBody}
        >
          <p>{confirmState?.text}</p>
        </DialogContent>
        <DialogActions
          className={`${classes.modalFooter} ${classes.modalFooterCenter}`}
        >
          <Button 
            variant="contained"
            color="error"
            startIcon={<ClearIcon/>}
            size="small" 
            onClick={onCancel}>
              Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<CheckIcon/>}
            size="small"
            color="success"
            onClick={onConfirm}> 
            Yes
          </Button>
        </DialogActions> */}
      </Dialog>
    </>
  );
}