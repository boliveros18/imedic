import { FC, ReactNode, useState } from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

interface Props {
  children?: ReactNode;
  question: string;
  state: any;
}

export const AlertDialog: FC<Props> = ({ question, state }) => {
  const [open, setOpen] = useState(false);   
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Dialog
        open={state}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{question}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleClose} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
