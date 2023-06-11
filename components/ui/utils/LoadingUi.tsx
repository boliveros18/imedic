import { ReactNode, useContext, FC } from "react";
import {
  Dialog,
  DialogContent,
  CircularProgress,
  Box
} from "@mui/material";
import { UIContext } from "../../../context/ui";

interface Props {
  children?: ReactNode;
}

const LoadingUi: FC<Props> = ({}) => {
  const { progress } = useContext(UIContext);

 return (
  <Dialog open={progress}>
  <DialogContent>
    <Box sx={{ display: "flex"}}>
      <CircularProgress/>
    </Box>
  </DialogContent>
</Dialog>
 )
}

export default LoadingUi;
