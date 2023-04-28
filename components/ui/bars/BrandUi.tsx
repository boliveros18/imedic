import { FC, ReactNode } from "react";
import { Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

interface Props {
  children?: ReactNode;
}

export const BrandUi: FC<Props> = ({}) => {
  return (
    <Typography
      variant="h6"
      noWrap
      component="div"
      sx={{
        display: { xs: "none", sm: "block", md: "block" },
      }}
    >
      <Link href="/" passHref>
        <a style={{ textDecoration: "none" }}>
          <Image
            style={{}}
            src="/Brand.png"
            width={139}
            height={40}
            alt="logo"
          ></Image>
        </a>
      </Link>
    </Typography>
  );
};
