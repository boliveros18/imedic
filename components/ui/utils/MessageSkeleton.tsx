import { FC, useContext } from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
} from "@mui/material";
import { UIContext } from "../../../context/ui";

interface Props {}

export const MessageSkeleton: FC<Props> = () => {
  const { loading } = useContext(UIContext);
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        {loading ? null : (
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
        )}
      </ListItemAvatar>
      <ListItemText
        primary={
          loading ? null : <Skeleton animation="wave" height={25} width="50%" />
        }
        secondary={
          loading ? null : <Skeleton animation="wave" height={20} width="80%" />
        }
      />
    </ListItem>
  );
};
