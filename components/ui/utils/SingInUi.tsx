import { FC, ReactNode, useContext } from "react";
import { AuthContext } from "../../../context/auth";
import NextLink from "next/link";
import { useRouter } from "next/router";

import { Stack, Button } from "@mui/material";

interface Props {
  children?: ReactNode;
}

export const SingInUi: FC<Props> = ({}) => {
  const router = useRouter();
  const { isLoggedIn } = useContext(AuthContext);
  const navigateTo = (url: string) => {
    router.push(url);
  };
  return isLoggedIn ? (
    <div />
  ) : (
    <Stack
      spacing={0}
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ pt: 1 }}
    >
      <Button
        variant="outlined"
        size="medium"
        color="primary"
        sx={{
          width: "90%",
          color: "black",
        }}
        onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)}
      >
        Sign in securely button
      </Button>
      <NextLink href="/auth/register" passHref>
        <Button variant="text" sx={{ fontSize: 13, width: "90%" }}>
          Create an account
        </Button>
      </NextLink>
    </Stack>
  );
};
