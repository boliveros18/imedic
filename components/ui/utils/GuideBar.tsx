import { FC, ReactNode, useContext } from "react";
import * as React from "react";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { GUIDE_TITLE, GUIDE_DETAIL } from "../../../constans/messages";
import { AuthContext } from "../../../context/auth";

interface Props {
  children?: ReactNode;
}

export const GuideBar: FC<Props> = ({}) => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? (
    <div />
  ) : (
    <Accordion elevation={0}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{ backgroundColor: "#E0E6FF" }}
      >
        <Typography sx={{ fontSize: 15 }}>{GUIDE_TITLE}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography sx={{ fontSize: 14 }}>{GUIDE_DETAIL}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};
