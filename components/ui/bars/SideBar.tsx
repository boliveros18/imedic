import { FC, ReactNode, useContext } from "react";
import * as React from "react";
import {
  Divider,
  Paper,
  MenuList,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Box,
  Drawer,
} from "@mui/material";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import AirplanemodeActiveOutlinedIcon from "@mui/icons-material/AirplanemodeActiveOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import QueuePlayNextOutlinedIcon from "@mui/icons-material/QueuePlayNextOutlined";
import AccessibilityNewOutlinedIcon from "@mui/icons-material/AccessibilityNewOutlined";
import RoomServiceOutlinedIcon from "@mui/icons-material/RoomServiceOutlined";
import { WindowSize } from "../../../utils";
import { UIContext } from "../../../context/ui";
import Link from "next/link";

interface Props {
  children?: ReactNode;
  keepOpen: boolean;
}

export const SideBar: FC<Props> = ({ keepOpen = false }) => {
  const size = WindowSize();
  const { sidemenuOpen, closeSideMenu } = useContext(UIContext);
  const getContent = () => {
    return (
      size.height > 0 && (
        <>
          <Paper
            sx={{ width: 280, height: size.height - 130, maxWidth: "95%" }}
            elevation={0}
          >
            <MenuList>
              <MenuItem onClick={closeSideMenu}>
                <ListItemIcon sx={{ ml: -0.25 }}>
                  <HomeOutlinedIcon fontSize="medium" />
                </ListItemIcon>
                <Link href="/" passHref>
                <ListItemText sx={{ ml: 2.25 }}>Home</ListItemText>
                </Link>
              </MenuItem>
              <MenuItem  onClick={closeSideMenu}>
                <ListItemIcon>
                  <QueuePlayNextOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText sx={{ ml: 2 }}>
                  Treatment & Surgeries
                </ListItemText>
              </MenuItem>
              <MenuItem  onClick={closeSideMenu}>
                <ListItemIcon>
                  <TrendingUpOutlinedIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText sx={{ ml: 2 }}>
                  Trends | <span style={{ color: "gray" }}>Surgeries</span>
                </ListItemText>
              </MenuItem>
              <MenuItem  onClick={closeSideMenu}>
                <ListItemIcon>
                  <AccessibilityNewOutlinedIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText sx={{ ml: 2 }}>
                  Principal | <span style={{ color: "gray" }}>Treatment</span>
                </ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem  onClick={closeSideMenu}>
                <ListItemIcon>
                  <AirplanemodeActiveOutlinedIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText sx={{ ml: 2 }}>Tickets</ListItemText>
              </MenuItem>
              <MenuItem  onClick={closeSideMenu}>
                <ListItemIcon>
                  <RoomServiceOutlinedIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText sx={{ ml: 2 }}>Hotel reservation</ListItemText>
              </MenuItem>
            </MenuList>
          </Paper>
          <Box sx={{ flexGrow: 1 }} />
          <Typography sx={{ fontSize: 13 }} align="center">
            Super Medical group -{" "}
            <Link href="./privacynotice">
              <a
                style={{
                  textDecoration: "none",
                  fontWeight: "500",
                  color: "#001B87",
                  cursor: "pointer"
                }}
              >
                Privacy notice
              </a>
            </Link>
            <br />
            Powered by Stripe.com
            <br />
            <Link href="./conditionuse">
              <a
                style={{
                  textDecoration: "none",
                  fontWeight: "500",
                  color: "#001B87",
                  cursor: "pointer"
                }}
              >
                Condition of Use
              </a>
            </Link>{" "}
            Copyright (c) 2022
          </Typography>
        </>
      )
    );
  };

  return (
    <>
      {keepOpen ? (
        getContent()
      ) : (
        <Drawer anchor="left" open={sidemenuOpen} onClose={closeSideMenu}>
          {getContent()}
        </Drawer>
      )}
    </>
  );
};
