import { FC, ReactNode, useState, useEffect, useRef } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Box,
} from "@mui/material";
import AirplanemodeActiveOutlinedIcon from "@mui/icons-material/AirplanemodeActiveOutlined";
import AccessibilityNewOutlinedIcon from "@mui/icons-material/AccessibilityNewOutlined";
import RoomServiceOutlinedIcon from "@mui/icons-material/RoomServiceOutlined";

interface Props {
  children?: ReactNode;
}

export const BottomBar: FC<Props> = ({}) => {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
  }, [value]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box ref={ref}>
      <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
        <BottomNavigation
          sx={{
            display: { xs: "block", sm: "none", md: "none" },
            pt: 1,
            pb: 1,
          }}
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="Procedures"
            icon={<AccessibilityNewOutlinedIcon />}
            sx={{ color: "#c4bebe", width: "33.33%" }}
          />
          <BottomNavigationAction
            label="Ticket"
            icon={<AirplanemodeActiveOutlinedIcon />}
            sx={{ color: "#c4bebe", width: "33.33%" }}
          />
          <BottomNavigationAction
            label="Hotels"
            icon={<RoomServiceOutlinedIcon />}
            sx={{ color: "#c4bebe", width: "33.33%" }}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};
