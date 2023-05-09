import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import { WindowSize } from "../../../utils";

export const CommentForm = styled("div")(({ }) => ({
  position: "relative",
  borderRadius: "3px",
  paddingTop: -2,
  backgroundColor: "#e3e3e3",
  "&:hover": {
    backgroundColor: "#e0dede",
  },
  width: "100%"
}));

export const StyledInputComment = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: 10,
    transition: theme.transitions.create("width"),
    width: WindowSize().width*0.3,
    [theme.breakpoints.only("xs")]: {
      marginLeft: 0,
      width: WindowSize().width*0.6,
    },
  },
}));