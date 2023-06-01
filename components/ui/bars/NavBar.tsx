import { FC, ReactNode, useState, MouseEvent, useContext } from "react";
import { useRouter } from "next/router";
import * as React from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Box,
  Badge,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Button,
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ManageAccountIcon from "@mui/icons-material/ManageAccountsOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import MoreIcon from "@mui/icons-material/MoreVert";
import ContentCopy from "@mui/icons-material/ContentCopy";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Logout from "@mui/icons-material/Logout";
import { AuthContext } from "../../../context/auth";
import { MedicContext } from "../../../context/medic";
import { FileContext } from "../../../context/file";

import { Search, SearchIconWrapper, StyledInputBase } from "../styled/Search";

import { MenuUi } from "./MenuUi";
import { BrandUi } from "./BrandUi";
import { SimpleSelect } from "./SimpleSelect";

interface Props {
  children?: ReactNode;
}

export const NavBar: FC<Props> = ({}) => {
  const { user, isLoggedIn, logout } = useContext(AuthContext);
  const { medic } = useContext(MedicContext);
  const { avatar } = useContext(FileContext);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);
  const navigateTo =  (url: string) => {
     router.push(url);
  };
 
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() =>{handleMenuClose() ; navigateTo(`/account/${user?.role}/${user?.role ==="client" ? null : medic._id }`)}} sx={{ width: 300, maxWidth: "100%" }}>
        <ListItemIcon>
          <Avatar alt="name" src={avatar.url || ""} sx={{ mr: 1 }} />
        </ListItemIcon>{" "}
        { user?.role === "medic" ? ("Md. " + user?.name) : user?.name }
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <ManageAccountIcon fontSize="small" />
        </ListItemIcon>
        Edit
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <ContentCopy fontSize="small" />
        </ListItemIcon>
        Order
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <PaymentOutlinedIcon fontSize="small" />
        </ListItemIcon>
        Payments
      </MenuItem>
      <Divider />
      <MenuItem onClick={logout}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      sx={{ width: 333, maxWidth: "100%" }}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 2 new articles"
          color="inherit"
        >
          <Badge badgeContent={2} color="error">
            <AddShoppingCartIcon />
          </Badge>
        </IconButton>
        Cart
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <ChatBubbleOutlineIcon />
          </Badge>
        </IconButton>
        Messages
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsNoneIcon />
          </Badge>
        </IconButton>
        Notifications
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Avatar alt={user?.name || ""} src={avatar.url || ""} />
        </IconButton>
        <p style={{ paddingRight: 145 }}>{ user?.role === "medic" ? ("Md. " + user?.name) : user?.name }</p>
      </MenuItem>
    </Menu>
  );

  return (
    <AppBar
      position="relative"
      elevation={0}
      style={{ backgroundColor: "white" }}
    >
      <Toolbar>
        <MenuUi />
        <BrandUi />
        <Box sx={{ flexGrow: 1 }} />
        <SimpleSelect />
        <Search sx={{ color: "black", width: "40ch", mr: 1 }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        {isLoggedIn ? (
          <Box sx={{ display: { xs: "none", md: "flex" }, color: "black" }}>
            <IconButton
              size="large"
              aria-label="show 2 new products"
              color="inherit"
              sx={{ width: "40px", height: "40px", mt: 1.5, mr: 0.5}}
            >
              <Badge badgeContent={2} color="error">
                <AddShoppingCartIcon/>
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              sx={{ width: "40px", height: "40px", mt: 1.5, mr: 0.5}}
            >
              <Badge badgeContent={4} color="error">
                <ChatBubbleOutlineIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              sx={{ width: "40px", height: "40px", mt: 1.5, mr: 0.5}}
            >
              <Badge badgeContent={7} color="error">
                <NotificationsNoneIcon fontSize="medium" />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar alt={user?.name || ""} src={avatar.url || ""} />
            </IconButton>
          </Box>
        ) : (
          <Box sx={{ display: { xs: "flex", md: "flex" }, color: "black" }}>
            <IconButton
              size="large"
              aria-label="show 2 new products"
              color="inherit"
            >
              <Badge badgeContent={2} color="error">
                <AddShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        )}
        {isLoggedIn ? (
          <Box sx={{ display: { xs: "flex", md: "none" }, color: "black" }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
              sx={{ width: "40px", height: "40px"}}
            >
              <MoreIcon  />
            </IconButton>
          </Box>
        ) : (
          <Button
            variant="outlined"
            color="primary"
            size="medium"
            onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)}
          >
            Login
          </Button>
        )}
      </Toolbar>
      {renderMobileMenu}
      {renderMenu}
    </AppBar>
  );
};
