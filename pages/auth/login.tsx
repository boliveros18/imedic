import { useState, useEffect } from "react";
import NextLink from "next/link";
import { GetServerSideProps } from "next";
import Image from "next/image";
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
import { signIn, getSession, getProviders } from "next-auth/react";
import { AuthLayout } from "../../components/layouts";
import { validations } from "../../utils";
import { PrivacyPolicy } from "../../components/ui";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);
  const [providers, setProviders] = useState<any>({});

  useEffect(() => {
    getProviders().then((prov) => {
      setProviders(prov);
    });
  }, []);

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);
    await signIn("credentials", { email, password });
  };

  return (
    <AuthLayout title={"Sing-In"}>
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Grid
          display="flex"
          justifyContent="center"
          sx={{ marginBottom: 4, marginTop: 16 }}
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
            width: 350,
            padding: "25px 20px",
            border: 1,
            borderColor: "lightgray",
            borderRadius: "5px",
            marginBottom: 1,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5">Sign In</Typography>
              <Chip
                label="We cannot find an account with that email address"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ display: showError ? "flex" : "none" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                autoComplete="username"
                fullWidth
                {...register("email", {
                  required: "Enter your email ",
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                autoComplete="current-password"
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
          sx={{ fontSize: 15, marginBottom: 3 }}
        >
          {" "}
          New to iMedical?&nbsp;
          <NextLink href="/auth/register" passHref>
            <Link underline="none" color="#001B87" sx={{ fontWeight: "500" }}>
              Sing Up
            </Link>
          </NextLink>
        </Grid>
        <Grid item xs={12} display="flex" flexDirection="column">
          {Object.values(providers).map((provider: any) => {
            if (provider.id === "credentials")
              return <div key="credentials"></div>;

            return (
              <Button
                key={provider.id}
                variant="outlined"
                fullWidth
                color="primary"
                sx={{ width: "100%", mb: 1 }}
                onClick={() => signIn(provider.id)}
              >
                {provider.name}
              </Button>
            );
          })}
        </Grid>
        <Divider sx={{ width: "100%", mt: 2 }} />
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
  const { p = "/" } = query;

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default LoginPage;
