import { FC, ReactNode, SyntheticEvent, useState } from "react";
import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { ChatMessages } from "../../chat";
import { Cart } from "../../cart";
import { People } from "../../people";
import { Notifications } from "../../notifications";
import { WindowSize } from "../../../utils";


interface Props {
  children?: ReactNode;
  userConnections?: string;
}

export const RightBar: FC<Props> = ({ userConnections }) => {
  const size = WindowSize();
  const [value, setValue] = useState(userConnections);
  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const renderSwitch = (value: string) => {
    switch (value) {
      case "Cart":
        return <Cart />;
      case "Chats":
        return <ChatMessages />;
      case "People":
        return <People />;
      case "Notifications":
        return <Notifications />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          height: size.height - 130,
        }}
      >
        {renderSwitch(value || "")}
      </Paper>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          bottom: 0,
        }}
      >
        <BottomNavigation showLabels value={value} onChange={handleChange}>
          <BottomNavigationAction
            label="Cart"
            value="Cart"
            icon={<AddShoppingCartIcon />}
            sx={{ color: "#c4bebe" }}
          />
          <BottomNavigationAction
            label="Chats"
            value="Chats"
            icon={<ChatBubbleOutlineIcon />}
            sx={{ color: "#c4bebe" }}
          />
          <BottomNavigationAction
            label="People"
            value="People"
            icon={<PeopleAltIcon />}
            sx={{ color: "#c4bebe" }}
          />
          <BottomNavigationAction
            label="Notifications"
            value="Notifications"
            icon={<NotificationsNoneIcon />}
            sx={{ color: "#c4bebe" }}
          />
        </BottomNavigation>
      </Paper>
    </div>
  );
};
