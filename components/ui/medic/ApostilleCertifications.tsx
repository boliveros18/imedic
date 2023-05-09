import { FC, ReactNode } from "react";

import { Grid, Typography } from "@mui/material";
import AddDocumentMedicProfile from "./AddDocumentMedicProfile";

interface Props {
  children?: ReactNode;
}

export const ApostilleCertifications: FC<Props> = ({}) => {
  return (
    <Grid container spacing={0} rowSpacing={2}>
      <Grid item xs={12} sx={{ mt: 1 }}>
        <Typography sx={{ fontSize: 15, fontWeight: "500" }}>
          Attach apostilled certifications
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ mt: -2 }}>
        <AddDocumentMedicProfile
          type="medic_diploma"
          text="Add PDF apostille medic diploma"
        />
        <AddDocumentMedicProfile
          type="specialization_diploma"
          text="Add PDF apostille specialization diploma"
        />
        <AddDocumentMedicProfile
          type="card_id"
          text="Add PDF apostille card id"
        />
        <AddDocumentMedicProfile
          type="curriculum"
          text="Add PDF curriculum vitae"
        />
      </Grid>
    </Grid>
  );
};

export default ApostilleCertifications;
