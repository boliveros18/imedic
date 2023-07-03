import { useContext, useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Divider
} from "@mui/material";
import { dbMedics, dbFiles } from "../../../database";
import { Layout } from "../../../components/layouts";
import { Medic, IUser, File } from "../../../interfaces";
import {
  SelectCategoryAndProcedure,
  MedicAccountCard,
  ManageClinicCertifications,
  ManageClinics,
  ManageDegrees,
  ManageProducts,
  CompleteMedicProfile,
  ProductQuotes,
  ProcedureAvailability,
  ProceduresInProcess,
  MedicContract,
} from "../../../components/medic";
import { EditUser } from "../../../components/ui/utils/EditUser";
import { ProductContext } from "../../../context/product";
import { ClinicContext } from "../../../context/clinic";
import { FileContext } from "../../../context/file";
import { MedicContext } from "../../../context/medic";
import { UIContext } from "../../../context/ui";
import LoadingUi from "../../../components/ui/utils/LoadingUi";
import { userData } from "../../../utils/functions";
import { UserDataComponent } from "../../../components/ui";

interface Props {
  id: string;
  user: IUser;
  medic: Medic;
  avatar: File;
  files: File[];
}

const AccountMedicPage: NextPage<Props> = ({
  id,
  user,
  medic,
  avatar,
  files,
}) => {

  const { setMedic } = useContext(MedicContext);
  const { clinics, getClinicsByMedicId } = useContext(ClinicContext);
  const { setFiles } = useContext(FileContext);
  const { index, products, getProductsByMedicId } = useContext(ProductContext);
  const { setProgress } = useContext(UIContext);


  useEffect(() => {
    setMedic(medic);
    setFiles(files);
    getClinicsByMedicId(medic._id || "");
    getProductsByMedicId(medic._id);
    setProgress(false)
  }, [
    id,
    medic,
    setMedic,
    files,
    setFiles,
    getClinicsByMedicId,
    getProductsByMedicId,
    setProgress
  ]);
  return (
    <Layout>
     <UserDataComponent user={user} avatar={avatar} />
     <LoadingUi/>
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
            <Typography sx={{ fontSize: 16, fontWeight: 400, mb: 1, ml: 2 }}>
              Medic Profile
            </Typography>
            <Divider />
            <SelectCategoryAndProcedure products={products} />
            <MedicAccountCard clinic={clinics[index]} medic={medic} />
            <CardContent sx={{ mb: -2 }}>
              <EditUser />
            </CardContent>
            <Divider />
            <CardContent sx={{ mt: "-14px" }}>
              <CompleteMedicProfile medic={medic} />
              <ManageClinics medic={medic} />
              <ManageClinicCertifications />
              <ManageDegrees medic={medic} />
              <ManageProducts medic={medic} />
              <ProductQuotes medic={medic} />
              <MedicContract medic={medic} />
              <ProcedureAvailability medic={medic} />
              <ProceduresInProcess medic={medic} /> {//TODO: check form validations
              }
            </CardContent>
          </Card>
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
  const medic = await dbMedics.getMedicById(id);
  const _id = medic?.parent_id;

  const files = await dbFiles.getFilesByParentIdAndType(
    medic?._id || "",
    "all"
  );
  if (!medic || !session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      id: _id,
      user: session ? user : {},
      avatar: avatar === undefined ? {} : avatar,
      medic: medic,
      files: files,
    },
  };
};

export default AccountMedicPage;
