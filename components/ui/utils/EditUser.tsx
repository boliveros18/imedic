import { FC, ReactNode, useState, useContext } from "react";
import {
  Box,
  IconButton,
  Typography,
  Button,
  Grid,
  TextField,
  Chip
} from "@mui/material";
import { AuthContext } from "../../../context/auth";
import { ErrorOutline } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { validations } from "../../../utils";
import { capitalize } from "../../../utils/strings";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Client, Medic, IUser } from "../../../interfaces";
import Router from "next/router";
import { ExpanderUi } from "./ExpanderUi";

interface Props {
  children?: ReactNode;
  medic?: Medic;
  client?: Client;
}

type FormData = {
  name: string;
  old_email: string;
  email: string;
  old_password: string;
  password: string;
};

export const EditUser: FC<Props> = ({ medic }) => {
  const { user, updateUser, loginUser } = useContext(AuthContext);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [toggleChangePassword, setToggleChangePassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const onUpdateForm = async ({
    name,
    old_email,
    email,
    password,
    old_password,
  }: FormData) => {
    setShowError(false);
    const { hasError, messageLogin } = await loginUser(old_email, old_password);
    if (!hasError) {
      const { hasError, messageUpdate } = await updateUser(user?._id || "", {
        ...(user as IUser),
        ["name"]: capitalize(name),
        ["email"]: email,
        ["password"]: toggleChangePassword ? password : old_password,
      });
      if (hasError) {
        setShowError(true);
        setErrorMessage(messageUpdate!);
        setTimeout(() => setShowError(false), 3000);
        return;
      }
      Router.reload();
    } else {
      setShowError(true);
      setErrorMessage(messageLogin!);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
  };

  return (
    <ExpanderUi title="Edit Profile" icon={true}>
    <form onSubmit={handleSubmit(onUpdateForm)} noValidate>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Chip
                  label="Wrong email or password"
                  color="error"
                  icon={<ErrorOutline />}
                  className="fadeIn"
                  sx={{ display: showError ? "flex" : "none" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="First and last name"
                  variant="outlined"
                  fullWidth
                  autoComplete="off"
                  defaultValue={user?.name || ""}
                  {...register("name", {
                    required: "This field is required",
                    minLength: { value: 2, message: "At least 2 characters" },
                  })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  size="small"
                />
              </Grid>
              <Grid item display={{ xs: "none" }}>
                <TextField
                  type="email"
                  label="Old_Email"
                  variant="outlined"
                  fullWidth
                  defaultValue={user?.email}
                  inputProps={{
                    form: {
                      autocomplete: "off",
                    },
                  }}
                  {...register("old_email", {
                    required: "Enter your email",
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  defaultValue={user?.email}
                  inputProps={{
                    form: {
                      autocomplete: "off",
                    },
                  }}
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
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  {...register("old_password", {
                    required: "This field is required",
                    minLength: { value: 6, message: "At least 6 characters" },
                  })}
                  error={!!errors.old_password}
                  helperText={errorMessage}
                  size="small"
                />
                <IconButton
                  sx={{
                    borderRadius: 0,
                    color: "#001B87",
                    mb: -2,
                  }}
                  onClick={() => setToggleChangePassword(!toggleChangePassword)}
                >
                  <Typography
                    sx={{
                      fontSize: 15,
                      fontWeight: "500",
                      borderRadius: 0,
                    }}
                  >
                    Change password
                  </Typography>
                  {toggleChangePassword ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )}
                </IconButton>
              </Grid>
              {toggleChangePassword && (
                <Grid item xs={12}>
                  <TextField
                    label="New password"
                    type="password"
                    variant="outlined"
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
              )}
              <Grid item xs={12} display="flex" justifyContent="center" sx={{ mb:2 }}>
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
                  Update
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
    </ExpanderUi>
  );
};

export default EditUser;
