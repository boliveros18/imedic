import { FC, useContext, useState, ChangeEvent, FormEvent, useEffect } from "react";
import { LikeContext } from "../../../context/like";
import { AuthContext } from "../../../context/auth";
import { UIContext } from "../../../context/ui";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { getFormatDistanceToNow } from "../../../utils";
import { CommentDialogUi } from "../utils/CommentDialogUi";
import { CommentContext } from "../../../context/comment";
import { Card, CardHeader, Avatar, IconButton, Grid } from "@mui/material";
import Link from "next/link";
import { Comment } from "../../../interfaces";
import { EditCommentUi } from "../comments/EditCommentUi";
import { pluralize } from "../../../utils/strings";
import { Reaction } from "../../../interfaces";

interface Props {
  item: Comment;
  parent_id?: string;
}

export const CardCommentUi: FC<Props> = ({ item, parent_id }) => {
  const { createComment, getCommentsByParentId } = useContext(CommentContext);
  const { tag, value, setTag, setValue } = useContext(UIContext);
  const { updateComment } = useContext(CommentContext);
  const [inputs, setInputs] = useState({});
  const [answer, setAnswer] = useState(false);
  const [edit, setEdit] = useState(false);
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
    getLikesByParentIdAndUserId(item._id, user?._id || "");
    getLikesLengthByParentId(item._id);
  }, [user, item, getLikesByParentIdAndUserId, getLikesLengthByParentId]);
  
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
        type: "Comment",
      }).then(() => getLikesLengthByParentId(parent_id));
    }
  };

  const reactionsO: any = (reactions: Reaction[], item: Comment) => {
    return reactionByParentId(item._id, reactions)[0]
      ? reactionByParentId(item._id, reactions)[0].likes
      : item.likes
  };

  const editComment = () => {
    item.description = value;
    updateComment(item._id, { ...item, description: value });
    setValue("");
    setInputs("");
    setEdit(false);
    setAnswer(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await createComment({
      ...inputs,
      type: "Comment",
      parent_id: parent_id,
      user_id: user?._id,
      user_tag_name: "@" + tag.user_name,
      user_tag_id: tag.user_id,
    } as Comment).then(() => {
      setValue("");
      setInputs("");
      setEdit(false);
      setAnswer(false);
      getCommentsByParentId(parent_id || "");
      getCommentsByParentId(item._id);
    });
  };

  const handleInput = ({ target }: ChangeEvent<any>) => {
    setValue(target.value);
    const value = target.type === "checkbox" ? target.checked : target.value;
    setInputs({
      ...inputs,
      [target.name]: answer
        ? value.substring(tag.user_name.length + 3)
        : edit
        ? value
        : null,
    });
  };

  const handleClose = () => {
    setEdit(false);
    setAnswer(false);
  };

  return (
    <Card sx={{ maxWidth: "100%" }} elevation={0}>
      <CardHeader
        avatar={<Avatar alt={item.user_name} src={item.user_photo} />}
        title={
          <Grid container>
            <Grid item xs={10} sm={10} md={10}>
              <Link href={`./user/${item.user_id}`}>
                <a
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontWeight: "500",
                  }}
                >
                  {item.user_name + " "}
                </a>
              </Link>
              <span>
                <Link href={`./user/${item.user_tag_id}`}>
                  <a
                    style={{
                      textDecoration: "none",
                      color: "#001B87",
                    }}
                  >
                    {item.user_tag_name}
                  </a>
                </Link>
                {" " + item.description}
              </span>
            </Grid>
            <Grid item xs={1} sm={1} md={1} sx={{ mt: -0.5 }}>
              <IconButton
                disabled={!isLoggedIn}
                aria-label="like"
                style={{
                  color: "black",
                }}
                onClick={() => handleLike(item._id, user?._id || "")}
              >
                {likeByParentAndUserId(likes, item._id || "", user?._id || "")
                  .length === 1 && isLoggedIn ? (
                  <CheckCircleIcon sx={{ color: "blue", fontSize: "15px" }} />
                ) : (
                  <CheckCircleOutlineIcon sx={{ fontSize: "15px" }} />
                )}
              </IconButton>
            </Grid>
            <Grid item xs={1} sm={1} md={1}>
              {(user?._id === item.user_id &&
                item.parent_id === parent_id &&
                isLoggedIn) ||
              user?.role === "admin" ||
              user?._id === item.user_id ? (
                <EditCommentUi item={item} setEdit={setEdit} />
              ) : null}
            </Grid>
          </Grid>
        }
        subheader={
          <Grid container spacing={0}>
            <Grid item xs={4}>
              <span>{getFormatDistanceToNow(item.createdAt)}</span>
            </Grid>
            <Grid item xs={4}>
              <span>
                {reactionsO(reactions, item) > 0
                  ? reactionsO(reactions, item) +
                    pluralize(" like", reactionsO(reactions, item))
                  : null}
              </span>
            </Grid>
            <Grid item xs={2}>
              {isLoggedIn && (
                <a
                  style={{ fontWeight: "500", cursor: "pointer" }}
                  onClick={() => {
                    setValue(" @" + item.user_name + " ");
                    setAnswer(true);
                    setTag({
                      user_name: item.user_name,
                      user_id: item.user_id,
                    });
                  }}
                >
                  Answer
                </a>
              )}
            </Grid>
          </Grid>
        }
      />
      {isLoggedIn && answer ? (
        <CommentDialogUi
          handleInput={handleInput}
          handleSubmit={handleSubmit}
          onCancel={answer}
          value={value}
          handleClose={handleClose}
          cancel={true}
        />
      ) : edit ? (
        <CommentDialogUi
          handleInput={handleInput}
          handleSubmit={editComment}
          onCancel={edit}
          value={value}
          handleClose={handleClose}
          cancel={true}
        />
      ) : null}
    </Card>
  );
};
