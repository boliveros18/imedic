import { FC, ReactNode, useContext, useEffect } from "react";
import { IconButton, CardActions, Typography, Grid } from "@mui/material";
import CommentIcon from "@mui/icons-material/ChatBubbleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { AuthContext } from "../../../context/auth";
import { LikeContext } from "../../../context/like";
import { UIContext } from "../../../context/ui";
import { pluralize } from "../../../utils/strings";
import { Reaction } from "../../../interfaces";

interface Props {
  children?: ReactNode;
  parent_id: string;
  initialLikes: number;
  type: string;
}

export const CardActionsUi: FC<Props> = ({ parent_id, initialLikes, type }) => {
  const { setOnFocus } = useContext(UIContext);
  const {
    createLike,
    deleteLike,
    likes,
    reactions,
    likeByParentAndUserId,
    getLikesLengthByParentId,
    getLikesByParentIdAndUserId,
    reactionByParentId,
  } = useContext(LikeContext);
  const { isLoggedIn, user } = useContext(AuthContext);

  useEffect(() => {
    getLikesByParentIdAndUserId(parent_id, user?._id || "");
    getLikesLengthByParentId(parent_id);
  }, [user, parent_id, getLikesByParentIdAndUserId, getLikesLengthByParentId]);

  const handleLike = (parent_id: string, user_id: string) => {
    if (likeByParentAndUserId(likes, parent_id, user_id).length === 1) {
      deleteLike(
        likeByParentAndUserId(likes, parent_id, user_id)[0]._id || ""
      ).then(() => getLikesLengthByParentId(parent_id));
    } else {
      createLike({
        user_id: user?._id || "",
        user_name: user?.name || "",
        parent_id: parent_id || "",
        type: type || "",
      }).then(() => getLikesLengthByParentId(parent_id));
    }
  };

  const reactionsO = (parent_id: string, reactions: Reaction[]) => {
    return reactionByParentId(parent_id, reactions)[0]
      ? reactionByParentId(parent_id, reactions)[0].likes
      : initialLikes;
  };

  return (
    <>
      <CardActions
        disableSpacing
        sx={{
          mb: -3,
          mt: -0.5,
        }}
      >
        <Grid container spacing={0}>
          <Grid item xs={0} sx={{ mr: -0.5 }}>
            <IconButton
              aria-label="like"
              color={isLoggedIn ? "primary" : "default"}
              disabled={!isLoggedIn}
              onClick={() => handleLike(parent_id, user?._id || "")}
            >
              {isLoggedIn &&
              likeByParentAndUserId(likes, parent_id, user?._id || "")
                .length === 1 ? (
                <CheckCircleIcon sx={{ color: "blue" }} fontSize="medium" />
              ) : (
                <CheckCircleOutlineIcon fontSize="medium" />
              )}
            </IconButton>
          </Grid>
          <Grid item xs={0}>
            <IconButton
              aria-label="comment"
              color={isLoggedIn ? "primary" : "default"}
              disabled={!isLoggedIn}
              onClick={() => setOnFocus(true)}
            >
              <CommentIcon fontSize="medium" />
            </IconButton>
          </Grid>
        </Grid>
      </CardActions>
      <Typography
        sx={{ fontSize: 14, fontWeight: 500, mt: 1.5, ml: 2, mb: 0}}
      >
        {reactionsO(parent_id, reactions) > 0
          ? reactionsO(parent_id, reactions) +
            pluralize(" like", reactionsO(parent_id, reactions))
          : null}
      </Typography>
    </>
  );
};
