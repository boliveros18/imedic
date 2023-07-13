import { FC, ReactNode, useContext } from "react";
import * as React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  Avatar,
  Typography,
  CardActionArea
} from "@mui/material";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { ShareMediaUi, CardActionsUi } from "..";
import { UIContext } from "../../../context/ui";
import { WindowSize } from "../../../utils";
import { useRouter } from "next/router";

interface Props {
    children?: ReactNode;
    item: any;
    route: boolean;
}

export const LargeItemCard: FC<Props> = ({ children, item, route }) => {
  const { loading, setProgress } = useContext(UIContext);
  const router = useRouter();
  const windowHeight = WindowSize().height;
  return (
        <Card
          sx={{
            width: "100%",
            mb: 1
          }}
          elevation={0}
        >
          <CardHeader
            sx={{ mb:-1}}
            avatar={
              loading && (
                <Avatar
                  alt={item?.name}
                  sx={{
                    fontWeight: "bold",
                    color: "white",
                    backgroundColor: "#c9daff",
                    fontSize: 12,
                  }}
                >
                  <AddModeratorIcon />
                </Avatar>
              )
            }
            action={
              loading && (
                <ShareMediaUi
                  name={item?.name}
                  description={
                    item?.finantial +
                    ". " +
                    item?.category +
                    ". " +
                    item?.technology
                  }
                />
              )
            }
            title={
              loading && (
                <Typography sx={{ fontSize: 15, fontWeight: 500 }}>
                  {item?.name + " "}
                  <CheckCircleIcon
                    sx={{
                      color: item?.status === "certified" ? "blue" : "lightgray",
                      fontSize: "15px",
                    }}
                  />
                </Typography>
              )
            }
            subheader={
              loading && item?.city + ", " + item?.country
            }
          />
          <CardActionArea
            onClick={() => { setProgress(true); route && router.push(`/${item?.type.toLowerCase()}/${item?._id}`);}}
            sx={{ cursor: route ? "pointer" : "auto",
            "&:hover .MuiCardActionArea-focusHighlight": {
              opacity: route ?  0.1 : 0, 
            }
          }}
          >
            {loading && (
              <CardMedia
                component="img"
                height={windowHeight - 450}
                image={item?.photo}
                alt={item?.type}
                sx={{ maxHeight: "450px" }}
              />
            )}
          </CardActionArea>
          {loading && (
            <CardActionsUi
              parent_id={item?._id || ""}
              initialLikes={item?.likes}
              type={item?.type}
            />
          )}
             {children}
        </Card>
  );
};
