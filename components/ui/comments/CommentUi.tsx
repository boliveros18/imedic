import { FC, useContext } from "react";
import * as React from "react";
import { CommentContext } from "../../../context/comment";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { CardCommentUi } from "./CardCommentUi";
import { Comment } from "../../../interfaces";
import { pluralize } from "../../../utils/strings";

interface Props {
  parent_id: string;
}

export const CommentUi: FC<Props> = ({ parent_id }) => {
  const { comments, commentsByParentId, getCommentsByParentId } =
    useContext(CommentContext);
  const answers = (comments: Comment[], item: Comment) => {
    return commentsByParentId(comments, item._id).length === 0
      ? item.comments
      : commentsByParentId(comments, item._id).length;
  };

  return (
    <Box
      sx={{
        height: "100%",
        bgcolor: "background.paper",
      }}
    >
      {commentsByParentId(comments, parent_id).length > 0 ? (
        commentsByParentId(comments, parent_id).map((item, index) => (
          <div key={index} style={{ marginBottom: -6, marginTop: -2 }}>
            <CardCommentUi item={item} parent_id={item._id} />
            <Accordion
              elevation={0}
              disableGutters={true}
              sx={{
                "&.MuiAccordion-root:before": {
                  backgroundColor: "white",
                },
              }}
            >
              {answers(comments, item) > 0 ? (
                <AccordionSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{
                    maxWidth: "100%",
                    mt: -1,
                    mb: -4,
                  }}
                  onClick={() => {getCommentsByParentId(item._id)}}
                >
                  <Box
                    sx={{
                      maxWidth: "100%",
                      mt: -2,
                      mb: 2,
                      ml: 6,
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    <a
                      style={{
                        fontWeight: "500",
                        cursor: "pointer",
                        color: "gray",
                      }}
                    >
                      {"See " +
                        answers(comments, item) +
                        pluralize(" answer", answers(comments, item))}
                    </a>
                  </Box>
                </AccordionSummary>
              ) : (
                <div />
              )}
              {commentsByParentId(comments, item._id).length ? (
                <AccordionDetails sx={{ marginBottom: -2, marginTop: 1 }}>
                  {commentsByParentId(comments, item._id)?.map(
                    (item2, index) => (
                      <div key={index} style={{ marginLeft: 4, marginTop: -8 }}>
                        <CardCommentUi item={item2} parent_id={item._id} />
                      </div>
                    )
                  )}
                </AccordionDetails>
              ) : (
                <div />
              )}
            </Accordion>
          </div>
        ))
      ) : (
        <div />
      )}
    </Box>
  );
};
