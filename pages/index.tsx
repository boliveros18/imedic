import { FC, useContext, useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import { dbClinics, dbLikes, dbMedics } from "../database";
import { Layout } from "../components/layouts";
import { HomeCard } from "../components/home";
import { Grid } from "@mui/material";
import { BottomBar, SideBar, RightBar, UserDataComponent } from "../components/ui";
import { Clinic, Like, IUser, Medic, File } from "../interfaces";
import { LikeContext } from "../context/like";
import { ClinicContext } from "../context/clinic";
import { UIContext } from "../context/ui";
import { MedicContext } from "../context/medic";
import { userData } from '../utils/functions';

interface Props {
  principal: Clinic;
  like: Like;
  medic: Medic;
  user: IUser;
  avatar: File;
}

const HomePage: NextPage<Props> = ({
  principal,
  like,
  medic,
  user,
  avatar
}) => {
  const { setMedic } = useContext(MedicContext);
  const { addLikes } = useContext(LikeContext);
  const { setPrincipal } = useContext(ClinicContext);
  const { setLoading, setProgress } = useContext(UIContext);

  useEffect(() => {
    setMedic(medic || {} as Medic);
    addLikes(like || {} as Like);
    setPrincipal(principal || {} as Clinic);
    setLoading(true);
    setProgress(false);
  }, [
    medic,
    setMedic,
    like,
    addLikes,
    setLoading,
    principal,
    setPrincipal,
    setProgress
  ]);     
  return (
    <Layout>
      <UserDataComponent user={user} avatar={avatar} />
      <Grid container spacing={0} rowSpacing={0}>
        <Grid
          item
          xs={8}
          sm={4}
          md={3}
          sx={{ display: { xs: "none", sm: "none", md: "block" } }}
          justifyContent="flex-start"
        >
          <SideBar keepOpen={true} />
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          <HomeCard />
        </Grid>
        <Grid
          item
          xs={4}
          sm={6}
          md={4}
          sx={{
            display: { xs: "none", sm: "block", md: "block" },
          }}
          justifyContent="flex-end"
        >
          <RightBar />
        </Grid>
      </Grid>
      <BottomBar />
    </Layout>
  );
};
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user, avatar, session } = await userData(req);
  const principal = await dbClinics.getPrincipalClinic();
  const medic = await dbMedics.getMedicByUserId(user?._id || "");
  const like: Like[] = await dbLikes.getLikeByParentIdAndUserId(
    principal._id || "",
    user?._id || ""
  );

  if (!principal) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      medic: medic,
      principal: principal,
      like: like,
      user: session ? user : {},
      avatar: avatar === undefined ? {} : avatar
    }
  };
};

export default HomePage;
