import { FC, ReactNode, useState } from "react";
import { Button, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

interface Props {
  children?: ReactNode;
  icon: boolean;
  title: string;
  setToggleChangePassword?: any;
}

export const ExpanderUi: FC<Props> = ({ children, icon, title, setToggleChangePassword }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <Button
        sx={{
          borderRadius: 0,
          color: "#001B87",
          "&:hover": {
            backgroundColor: "white",
          },
          textTransform: "capitalize"
        }}
        onClick={() => {setToggle(!toggle); setToggleChangePassword(!toggle) }}
      >
        <Typography
          sx={{
            fontSize: 15,
            fontWeight: "500",
            borderRadius: 0,
          }}
        >
          {title}
        </Typography>
        {icon && (toggle ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
      </Button>
      { toggle && children }
    </>
  );
};
