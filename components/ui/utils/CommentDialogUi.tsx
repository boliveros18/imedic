import { FC, ReactNode, ChangeEventHandler, MouseEventHandler } from "react";
import { IconButton, Grid, Box, Typography } from "@mui/material";
import { CommentForm, StyledInputComment } from "../styled/CommentForm";

interface Props {
  children?: ReactNode;
  handleInput: ChangeEventHandler;
  handleSubmit: MouseEventHandler;
  onCancel: boolean;
  cancel: boolean;
  value: string;
  handleClose?: any;
  placeholder?: string;
  OnFocus?: any;
}

export const CommentDialogUi: FC<Props> = ({
  children,
  handleInput,
  handleSubmit,
  onCancel,
  cancel,
  value,
  handleClose,
  placeholder,
  OnFocus,
}) => {
  return (
    <Grid container sx={{ mt:1 }}>
      <Grid item xs={1} sm={1} md={1}>
        {children}
      </Grid>
      <Grid item xs={!cancel ? 9 :11} sm={!cancel ? 9 :11} md={!cancel ? 9 :11} sx={{ pl: 4}}>
        <CommentForm style={{ color: "black", borderRadius: "3px" }}>
          <StyledInputComment
            style={{ width: "100%", fontSize: 15 }}
            value={value}
            type="text"
            name="description"
            placeholder={placeholder}
            inputProps={{ "aria-label": "comment" }}
            inputRef={(input: any) => onCancel && input?.focus()}
            onBlur={OnFocus}
            onChange={handleInput}
            autoComplete="off"
          />
        </CommentForm>
      </Grid>
      {cancel ? (
        <Grid container sx={{ mb: 1 }}>
          <Box sx={{ flexGrow: 1 }} />
          <Grid item xs={2} sm={2} md={1} sx={{ mr: 2 }}>
            <IconButton
              aria-label="settings"
              style={{
                color: "black",
              }}
              onClick={handleClose}
            >
              <Typography
                sx={{ fontSize: 15, textTransform: "capitalize" }}
                variant="subtitle2"
              >
                Cancel
              </Typography>
            </IconButton>
          </Grid>
          <Grid item xs={2} sm={2} md={1} sx={{ mr: 2 }}>
            <IconButton
              aria-label="settings"
              style={{
                color: "black",
              }}
              onClick={handleSubmit}
            >
              <Typography
                sx={{ fontSize: 15, textTransform: "capitalize" }}
                variant="subtitle2"
              >
                Post
              </Typography>
            </IconButton>
          </Grid>
        </Grid>
      ) : (
        <Grid item xs={1} sm={1} md={1}>
          <IconButton
            aria-label="settings"
            style={{
              color: "black",
              marginLeft: 8,
              marginRight: -6,
            }}
            onClick={handleSubmit}
          >
            <Typography
              sx={{ fontSize: 15, textTransform: "capitalize" }}
              variant="subtitle2"
            >
              Post
            </Typography>
          </IconButton>
        </Grid>
      )}
    </Grid>
  );
};
