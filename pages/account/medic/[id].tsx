import { useContext, useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import { Typography, Card, CardContent, Grid, Divider } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { getSession } from "next-auth/react";
import { dbMedics, dbProducts, dbClinics } from "../../../database";
import { Layout } from "../../../components/layouts";
import { Medic, Product, Clinic, IUser, File } from "../../../interfaces";
import { AuthContext } from "../../../context/auth";
import {
  SelectCategoryAndProcedure,
  MedicAccountCard,
  EditUser,
  ManageClinics,
} from "../../../components/ui";
import { ProductContext } from "../../../context/product";
import { ClinicContext } from "../../../context/clinic";
import { FileContext } from "../../../context/file";
import { MedicContext } from "../../../context/medic";
import { UIContext } from "../../../context/ui";
import CompleteMedicProfile from "../../../components/ui/medic/CompleteMedicProfile";

interface Props {
  id: string;
  user: IUser;
  medic: Medic;
  products: Product[];
}

const AccountMedicPage: NextPage<Props> = ({ id, user, medic, products }) => {
  const { progress } = useContext(UIContext);
  const { setMedic } = useContext(MedicContext);
  const { clinics, getClinicsByMedicId } = useContext(ClinicContext);
  const { setUser } = useContext(AuthContext);
  const { getFilesByParentIdAndType } = useContext(FileContext);

  useEffect(() => {
    setUser(user);
    setMedic(medic);
    getFilesByParentIdAndType(user?._id || "", "image");
    getClinicsByMedicId(medic._id || "");
  }, [
    id,
    user,
    medic,
    setMedic,
    setUser,
    getClinicsByMedicId,
    products,
    getFilesByParentIdAndType,
  ]);

  return (
    <Layout>
      {progress && (
        <CircularProgress sx={{ position: "absolute", marginLeft: "50%" }} />
      )}
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
            <MedicAccountCard clinic={clinics[0]} medic={medic} />
            <CardContent>
              <EditUser medic={medic} />
              <CompleteMedicProfile medic={medic} />
              <ManageClinics medic={medic} />
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
  const session = await getSession({ req });
  const { id } = params as { id: string };
  const user: any = session?.user;
  user ? delete Object.assign(user, { _id: user.id })["id"] : null;
  const medic = await dbMedics.getMedicById(id);
  const _id = medic?.parent_id;
  const products = await dbProducts.getProductsByMedicId(id);
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
      medic: medic,
      products: products,
    },
  };
};

export default AccountMedicPage;
