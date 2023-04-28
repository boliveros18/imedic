import { FC, ReactNode, useContext } from "react";
import * as React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Typography,
  ListItemText,
  IconButton,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  MessageSkeleton,
} from "../ui";
import { UIContext } from "../../context/ui";

interface Props {
  children?: ReactNode;
}

export const ChatMessages: FC<Props> = ({}) => {
  const { loading } = useContext(UIContext);

  return (
    <List sx={{ width: "100%", minWidth: 300, bgcolor: "background.paper" }}>
      <Grid container>
        <Grid
          item
          xs={11}
          sx={{ marginLeft: 3, marginRight: -5, marginTop: 2 }}
        >
          <Typography align="center" sx={{ fontWeight: "medium" }}>
            Chats
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <IconButton aria-label="settings">
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={
            <Search style={{ marginLeft: 0 }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          }
        />
      </ListItem>
      <div style={{ overflow: "auto", maxHeight: 415 }}>
        {loading ? (
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography
                  sx={{ display: "inline", fontWeight: "medium" }}
                  component="span"
                  variant="body1"
                  color="text.primary"
                >
                  Charles fernindan
                </Typography>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  ></Typography>
                  <span style={{ fontWeight: "500", color: "black" }}>
                    Neighborhood doing errands this{" "}
                  </span>{" "}
                  0:13
                </React.Fragment>
              }
            />
          </ListItem>
        ) : null}
        <MessageSkeleton />
        <MessageSkeleton />
        <MessageSkeleton />
        <MessageSkeleton />
        <MessageSkeleton />
        <MessageSkeleton />
      </div>
    </List>
  );
};
