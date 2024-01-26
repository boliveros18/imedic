import { useContext, useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import { Typography, Card, CardContent, Grid, Divider } from "@mui/material";

import { Layout } from "../../../components/layouts";
import { IUser, File } from "../../../interfaces";
import { UIContext } from "../../../context/ui";
import LoadingUi from "../../../components/ui/utils/LoadingUi";
import { userData } from "../../../utils/functions";
import { UserDataComponent } from "../../../components/ui";
import { UserAccountCard } from "../../../components/user";
import ClientNavigation from "../../../components/client/ClientNavigation";

interface Props {
  user: IUser;
  avatar: File;
}

const AccountClientPage: NextPage<Props> = ({ user, avatar }) => {
  const { setProgress } = useContext(UIContext);
  useEffect(() => {
    setProgress(false);
  }, [setProgress]);

  return (
    <Layout>
      <UserDataComponent user={user} avatar={avatar} />
      <LoadingUi />
      <Grid container spacing={0} rowSpacing={2}>
        <Grid
          item
          xs={0}
          sm={1}
          md={1}
          sx={{ display: { xs: "block", sm: "block", md: "block" } }}
          justifyContent="flex-start"
        ></Grid>
        <Grid item xs={12} sm={6} md={4} justifyContent="center">
          <Card
            sx={{
              width: "100%",
            }}
            elevation={0}
          >
            <CardContent sx={{ mb: 1 }}>
              <Typography sx={{ fontSize: 16, fontWeight: 400, mb: 1, ml: 2 }}>
                Client Account
              </Typography>
              <Divider />
              <UserAccountCard />
              <ClientNavigation/>
            </CardContent>
            <Divider />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user, avatar, session } = await userData(req);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: session ? user : {},
      avatar: avatar === undefined ? {} : avatar,
    },
  };
};

export default AccountClientPage;
