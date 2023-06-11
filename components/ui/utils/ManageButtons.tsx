import { FC, ReactNode, useState } from "react";
import { Grid, Button, Dialog, DialogTitle, DialogActions } from "@mui/material";

interface Props {
  children?: ReactNode;
  suppress: any;
  create?: boolean;
  submit: string;
  type: string;
}

export const ManageButtons: FC<Props> = ({ suppress, create, submit, type }) => {
  const [open, setOpen] = useState(false);    
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Grid container spacing={0} rowSpacing={2}>
    <Grid item xs={3} display="flex" justifyContent="center">
      <Button
        type="button"
        disabled={create}
        variant="outlined"
        size="medium"
        sx={{
          width: "90%",
          color: "white",
          backgroundColor: "#ff5757",
          borderColor: "#ff5757",
        }}
        onClick={handleClickOpen}
      >
        delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ fontSize: 16, fontWeight: "500" }}
        >
          {`Do you want to delete this ${type}?`}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} sx={{ fontSize: 14 }}>
            No
          </Button>
          <Button
            onClick={() => {
              handleClose();
              suppress();
            }}
            autoFocus
            sx={{ fontSize: 14 }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
    <Grid item xs={9} display="flex" justifyContent="center">
      <Button
        type="submit"
        variant="outlined"
        size="medium"
        sx={{
          width: "100%",
          color: "black",
          backgroundColor:
            submit === "SAVE" ? "ligthgray" : "primary",
        }}
      >
        {submit}
      </Button>
    </Grid>
  </Grid>
  );
};

export default ManageButtons;
