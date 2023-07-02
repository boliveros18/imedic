import { useContext, useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import {
  dbCertifications,
  dbClinics,
  dbQualifications,
} from "../../database";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Box,
  Grid,
  CardHeader,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { WindowSize, UseWindowSize } from "../../utils";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import {
  ReadMore,
  ShareMediaUi,
  CardActionsUi,
  InstagramLink,
  ItemQualification,
  SeeComments,
  SideBar,
  UserDataComponent,
} from "../../components/ui";
import { Layout } from "../../components/layouts";
import { Clinic, Certification, Qualification, IUser, File } from "../../interfaces";
import { UIContext } from "../../context/ui";
import { userData } from "../../utils/functions";

interface Props {
  clinic: Clinic;
  certification: Certification[];
  qualifications: Qualification[];
  user: IUser;
  avatar: File;
}

const ClinicPage: NextPage<Props> = ({
  clinic,
  certification,
  qualifications,
  user,
  avatar,
}) => {
  const mobile = UseWindowSize();
  const size = WindowSize();
  const { setProgress } = useContext(UIContext);

  useEffect(() => {
    setProgress(false);
  }, [setProgress]);

  return (
    <Layout>
      <UserDataComponent user={user} avatar={avatar} />
      <Grid container spacing={0} rowSpacing={2}>
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
        <Grid item xs={12} sm={6} md={5} justifyContent="center">
          <SeeComments
            parent_id={clinic._id || ""}
            type={clinic.type}
            initialAnswers={clinic.comments}
          >
            <Card
              sx={{
                width: "100%",
                minHeight: size.height - 219,
              }}
              elevation={0}
            >
              <CardHeader
                sx={{ mt: -1, mb: -1 }}
                avatar={
                  <Avatar
                    alt={clinic?.name}
                    sx={{
                      fontWeight: "bold",
                      color: "white",
                      backgroundColor: "#c9daff",
                      fontSize: 12,
                    }}
                  >
                    <AddModeratorIcon />
                  </Avatar>
                }
                action={
                  <ShareMediaUi
                    name={clinic?.name}
                    description={
                      clinic?.finantial +
                      ". " +
                      clinic?.category +
                      ". " +
                      clinic?.technology
                    }
                  />
                }
                title={
                  <Typography sx={{ fontSize: 15, fontWeight: 500 }}>
                    {clinic?.name + " "}
                    <CheckCircleIcon
                      sx={{
                        color: clinic?.certified ? "blue" : "lightgray",
                        fontSize: "15px",
                      }}
                    />
                  </Typography>
                }
                subheader={clinic?.city + ", " + clinic?.country}
              />
              <CardMedia
                component="img"
                height={size.height - 500}
                image={clinic.photo}
                alt="Clinic"
                sx={{ marginTop: 1, maxHeight: "330px", mb: -2.5 }}
              />
              <CardContent>
                <CardActionsUi
                  parent_id={clinic?._id || ""}
                  initialLikes={clinic.likes}
                  type={clinic.type}
                />
                <Accordion elevation={0} disableGutters={true} sx={{ mt: 2 }}>
                  <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography
                      sx={{ fontSize: 15, fontWeight: "500", color: "#001B87" }}
                    >
                      Finantial, Specialty & Technology
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ fontSize: 14 }}>
                      {clinic?.finantial +
                        ". " +
                        clinic?.category +
                        ". " +
                        clinic?.technology}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion elevation={0} disableGutters={true}>
                  <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography
                      sx={{ fontSize: 15, fontWeight: "500", color: "#001B87" }}
                    >
                      See certifications
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {certification.map((item, index) => (
                      <Card key={index} sx={{ display: "flex" }} elevation={0}>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <CardContent sx={{ flex: "1 0 auto" }}>
                            <Typography
                              sx={{ fontSize: 15, fontWeight: "500" }}
                            >
                              {item?.name || ""}
                            </Typography>
                            <Grid sx={{ fontSize: 14 }}>
                              {mobile ? (
                                <ReadMore text={item?.description || ""} />
                              ) : (
                                item?.description || ""
                              )}
                            </Grid>
                          </CardContent>
                        </Box>
                        <Box sx={{ flexGrow: 1 }} />
                        <CardMedia
                          component="img"
                          sx={{
                            width: item?.logo_link ? 50 : 0,
                            m: 1,
                            border: 0,
                          }}
                          image={item?.logo_link}
                          alt=""
                        />
                      </Card>
                    ))}
                  </AccordionDetails>
                </Accordion>
                {
                  <ItemQualification
                    type={clinic.type}
                    qualifications={qualifications}
                    Qualification={clinic.qualification}
                  />
                }
                <InstagramLink
                  instagram={clinic.instagram}
                  phone={clinic.phone}
                />
              </CardContent>
            </Card>
          </SeeComments>
        </Grid>
      </Grid>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const { id } = params as { id: string };
  const { user, avatar, session } = await userData(req);
  const clinic = await dbClinics.getClinicById(id);
  const certification = await dbCertifications.getCertificationsByClinicId(id);
  const qualifications = await dbQualifications.getQualificationByParentId(id);

  if (!clinic) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      clinic,
      certification,
      qualifications,
      user: session ? user : {},
      avatar: avatar === undefined ? {} : avatar,
    },
  };
};

export default ClinicPage;
