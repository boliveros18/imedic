import { FC, ReactNode } from "react";
import NextLink from "next/link";
import { Link, Typography } from "@mui/material";

interface Props {
  children?: ReactNode;
}

export const PrivacyPolicy: FC<Props> = ({}) => {
  return (
    <Typography sx={{ fontSize: 13, marginTop: 1 }} align="center">
      Super Medical group -
      <NextLink href="./privacynotice">
        <Link
          underline="none"
          style={{
            fontWeight: "500",
            color: "#001B87",
            cursor: "pointer",
          }}
        >
          Privacy notice
        </Link>
      </NextLink>
      <br />
      <NextLink href="./conditionuse">
        <Link
          underline="none"
          style={{
            fontWeight: "500",
            color: "#001B87",
            cursor: "pointer",
          }}
        >
          Condition of Use
        </Link>
      </NextLink>{" "}
      Copyright (c) 2022
    </Typography>
  );
};
