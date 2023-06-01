import { FC, ReactNode } from "react";
import { Typography } from "@mui/material";

interface Props {
  children?: ReactNode;
}

export const TermsOfUse: FC<Props> = ({}) => {
  return (
    <>
      <Typography align="justify" sx={{ marginBottom: 2 }}>
        <span style={{ fontWeight: "600", fontSize: 18 }}>Terms of Use</span>
      </Typography>
      <Typography variant="body2" align="justify" sx={{ marginBottom: 2 }}>
        These Terms of Use (or “Terms”) govern your use of iMedical, except
        where we expressly state that separate terms (and not these) apply, and
        provide information about the iMedical Service (the “Service”), outlined
        below. When you sign a medic account, client account or use iMedical, you agree to these
        terms.
      </Typography>
      <Typography align="justify" sx={{ marginBottom: 2 }}>
        <span style={{ fontWeight: "600", fontSize: 16 }}>
          The iMedical Service
        </span>
      </Typography>
      <Typography variant="body2" align="justify" sx={{ marginBottom: 2 }}>
        We agree to provide you with the iMedical Service. The Service includes
        all of the iMedical products, features, applications, services,
        technologies, and software that we provide to advance iMedical&apos;s
        mission: To bring you contact information about medics and medical
        services. The Service is made up of the following aspects:
      </Typography>
      <Typography align="justify">
        <span style={{ fontWeight: "600", fontSize: 15 }}>
          • Developing and using technologies that help us consistently serve
          our growing community.
        </span>
      </Typography>
      <Typography variant="body2" align="justify">
        Organizing and analyzing information for our growing community is
        central to our Service. A big part of our Service is creating and using
        cutting-edge technologies that help us personalize, protect, and improve
        our Service on an incredibly large scale for a broad global community.
      </Typography>
    </>
  );
};
