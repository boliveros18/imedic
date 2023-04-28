import { FC } from "react";
import { Typography, Box, Link, Grid } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import InstagramIcon from "@mui/icons-material/Instagram";

interface Props {
  instagram: string;
  phone: string;
}

export const InstagramLink: FC<Props> = ({ instagram, phone }) => {
  return (
    <Grid container>
      <Link href={instagram} target="_blank" sx={{ textDecoration: "none" }}>
        <Typography
          sx={{
            fontSize: 14,
            cursor: "pointer",
            color: "#001B87",
            fontWeight: "500",
            mt: 0.5,
          }}
        >
          <InstagramIcon fontSize="small" sx={{ mb: -0.5 }} />
          {instagram?.substring(26, instagram.length - 7)}
        </Typography>
      </Link>
      <Box sx={{ flexGrow: 1 }} />
      <Typography
        sx={{
          fontSize: 14,
          mt: 0.5,
        }}
      >
        <PhoneIcon fontSize="small" sx={{ mb: -0.5 }} />
        {phone}
      </Typography>
    </Grid>
  );
};
