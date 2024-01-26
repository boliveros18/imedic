import { useState, useContext } from "react";
import NextLink from "next/link";
import { GetServerSideProps } from "next";
import { signIn, getSession } from "next-auth/react";
import { capitalize } from "../../utils/strings";
import {
  Box,
  Button,
  Chip,
  Grid,
  Link,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { AuthContext } from "../../context/auth";
import { AuthLayout } from "../../components/layouts";
import { validations } from "../../utils";
import { PrivacyPolicy } from "../../components/ui";
import { Client, Medic } from "../../interfaces";
import { dbClients, dbMedics } from "../../database";

type FormData = {
  name: string;
  email: string;
  password: string;
  photo: string;
  role: string;
};

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext);
  const [userRole, setUserRole] = useState("client");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onRegisterForm = async ({ name, email, password, photo }: FormData) => {
    setShowError(false);
    const { hasError, message } = await registerUser(
      capitalize(name),
      email,
      password,
      photo,
      userRole
    );

    if (hasError) {
      setShowError(true);
      setErrorMessage(message!);
      setTimeout(() => setShowError(false), 3000);
      return;
    } else{
      await signIn("credentials", { email, password });
    }

  };

  return (
    <AuthLayout title={"Register"}>
      <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
        <Grid
          display="flex"
          justifyContent="center"
          sx={{ marginBottom: 4, marginTop: 18 }}
        >
          <NextLink href="/" passHref>
            <Link style={{ textDecoration: "none" }}>
              <Image
                src="/Brand.png"
                width={139}
                height={40}
                alt="logo"
              ></Image>
            </Link>
          </NextLink>
        </Grid>
        <Box
          sx={{
            width: 320,
            padding: "25px 20px",
            border: 1,
            borderColor: "lightgray",
            borderRadius: "5px",
            marginBottom: 1,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5">{`Create a ${userRole} account`}</Typography>
              <Chip
                label="This email address is in use"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ display: showError ? "flex" : "none", mt: 1, mb: 1 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="First and last name"
                variant="outlined"
                autoComplete="off"
                fullWidth
                {...register("name", {
                  required: "This field is required",
                  minLength: { value: 2, message: "At least 2 characters" },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                autoComplete="off"
                fullWidth
                {...register("email", {
                  required: "Enter your email",
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type = "password"
                label="Password"
                variant="outlined"
                autoComplete="off"
                fullWidth
                {...register("password", {
                  required: "This field is required",
                  minLength: { value: 6, message: "At least 6 characters" },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                size="small"
              />
            </Grid>
            <Grid item display={{ xs: "none" }}>
              <TextField
                label="Role"
                variant="outlined"
                value={userRole}
                fullWidth
                {...register("role", {
                  required: "This field is required",
                })}
              />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="center">
              <Button
                type="submit"
                variant="outlined"
                size="medium"
                color="primary"
                sx={{
                  width: "90%",
                  color: "black",
                }}
              >
                Continue
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="end"
          sx={{ fontSize: 15 }}
        >
          Already have an account?&nbsp;
          <NextLink href="/auth/login" passHref>
            <Link underline="none" color="#001B87" sx={{ fontWeight: "500" }}>
              Sing In
            </Link>
          </NextLink>
        </Grid>
        {userRole === "medic" ? (
          <Grid
            item
            display="flex"
            justifyContent="end"
            sx={{ fontSize: 15, marginBottom: 3 }}
          >
            Do you need any procedure?&nbsp;
            <Link
              underline="none"
              color="#001B87"
              sx={{ fontWeight: "500", cursor: "pointer" }}
              onClick={() => setUserRole("client")}
            >
              Sign Up as a Client
            </Link>
          </Grid>
        ) : (
          <Grid
            item
            display="flex"
            justifyContent="end"
            sx={{ fontSize: 15, marginBottom: 3 }}
          >
            Are you a specialist doctor?&nbsp;
            <Link
              underline="none"
              color="#001B87"
              sx={{ fontWeight: "500", cursor: "pointer" }}
              onClick={() => setUserRole("medic")}
            >
              Sign Up as a partner
            </Link>
          </Grid>
        )}
        <Divider />
        <PrivacyPolicy />
      </form>
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });
  if (session?.user) {
    const user: any = session?.user;

    if (user.role === "medic") {
      const medic = await dbMedics.createMedic({
        type: "Medic",
        parent_id: user.id,
        status: "pending",
        availables_dates: [],
        qualification: 0,
        comments: 0,
        likes: 0,
        instagram: "",
        age: 0,
        years_experience: 0,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      } as Medic);

      const { m = `/account/medic/${medic._id}` } = query;
      return {
        redirect: {
          destination: m.toString(),
          permanent: false,
        },
      };
    } else {
       await dbClients.createClient({
        type: "Client",
        parent_id: user.id,
        instagram: "",
        phone: "",
        title: "",
        birth: 0,
        gender: "",
        passport_number: "",
        passport_expiry_date: 0,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      } as Client);
      const { c = "/" } = query;
      return {
        redirect: {
          destination: c.toString(),
          permanent: false,
        },
      };
    }
  }

  return {
    props: {},
  };
};

export default RegisterPage;
