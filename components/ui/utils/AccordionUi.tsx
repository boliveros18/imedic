import { FC, ReactNode, useState } from "react";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Props {
  children?: ReactNode;
  summary: string;
}

export const AccordionUi: FC<Props> = ({ children, summary }) => {
  const [toogle, setToogle] = useState(false);
  return (
    <Accordion
      elevation={0}
      disableGutters={true}
      onClick={() => setToogle(!toogle)}
      sx={{mb:-1, mt:-0.5}}
    >
      <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
        <Typography sx={{ fontSize: 15, fontWeight: "500", color: "#001B87" }}>
          {summary}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {toogle ? (
          <KeyboardArrowUpIcon sx={{ color: "#001B87" }} />
        ) : (
          <ExpandMoreIcon sx={{ color: "#001B87" }} />
        )}
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default AccordionUi;
