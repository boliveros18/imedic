import { FC, ReactNode, useContext } from "react";
import { UIContext } from "../../../context/ui";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
interface Props {
  children?: ReactNode;
}

export const MenuUi: FC<Props> = ({}) => {
  const { openSideMenu } = useContext(UIContext);
  return (
    <IconButton
      edge="start"
      color="inherit"
      aria-label="open drawer"
      sx={{
        display: { xs: "block", sm: "block", md: "none" },
        color: "black",
        mt: -1,
        mb: -2,
        width: "40px",
        height: "40px",
      }}
      onClick={openSideMenu}
    >
      <MenuIcon />
    </IconButton>
  );
};
