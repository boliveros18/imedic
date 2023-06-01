import { FC, ReactNode, useContext, useState, useEffect } from "react";
import AccordionUi from "../utils/AccordionUi";
import { Box, Container, Grid, Typography } from "@mui/material";
import { ApiClient } from "../../../apis";
import { UIContext } from "../../../context/ui";
import { AuthContext } from "../../../context/auth";
import { Medic, File } from "../../../interfaces";
import { useSnackbar } from "notistack";
import { FileContext } from "../../../context/file";

interface Props {
  children?: ReactNode;
  medic: Medic;
}

export const MedicContract: FC<Props> = ({ medic }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { setProgress } = useContext(UIContext);
  const { user } = useContext(AuthContext);
  const { file, updateFile, createFile, getFilesByParentIdAndType } =
    useContext(FileContext);
  const [image, setImage] = useState({} as File);

  useEffect(() => {
    getFilesByParentIdAndType(medic._id, "signature");
    if (file.type === "signature") {
      setImage(file);
    }
  }, [medic, file, getFilesByParentIdAndType]);

  return (
    <AccordionUi summary="Medic Contract">
      <Grid container spacing={0} rowSpacing={2}>
        <Grid item xs>
          <Container  sx={{}}>
            <Box sx={{  width: '100%' }} >
              <Typography align="justify" sx={{ marginBottom: 2 }}>
                Paragraph 1: Lorem ipsum dolor sit amet
              </Typography>
              <Typography variant="body2"  align="justify" sx={{ marginBottom: 2 }}>
                body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quos blanditiis tenetur unde suscipit, quam beatae rerum
                inventore consectetur, neque doloribus, cupiditate numquam
                dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quos blanditiis tenetur unde suscipit, quam beatae rerum
                inventore consectetur, neque doloribus, cupiditate numquam
                dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quos blanditiis tenetur unde suscipit, quam beatae rerum
                inventore consectetur, neque doloribus, cupiditate numquam
                dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quos blanditiis tenetur unde suscipit, quam beatae rerum
                inventore consectetur, neque doloribus, cupiditate numquam
                dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quos blanditiis tenetur unde suscipit, quam beatae rerum
              </Typography>
              <Typography align="justify" sx={{ marginBottom: 2 }}>
                Paragraph 2: Lorem ipsum dolor sit amet
              </Typography>
              <Typography variant="body2"  align="justify">
                body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quos blanditiis tenetur unde suscipit, quam beatae rerum
                inventore consectetur, neque doloribus, cupiditate numquam
                dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quos blanditiis tenetur unde suscipit, quam beatae rerum
                inventore consectetur, neque doloribus, cupiditate numquam       
              </Typography>
            </Box>
          </Container>
        </Grid>
        <Grid container spacing={0} rowSpacing={2} sx={{ marginTop: 0 }}>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
            <label>
              <input
                type="file"
                hidden
                accept="image/png, image/jpeg, image/jpg"
                onChange={async ({ target }) => {
                  setProgress(true);
                  if (target.files) {
                    try {
                      const files = target.files[0];
                      const formData = new FormData();
                      formData.append("file", files);
                      formData.append("id", user?._id || "");
                      formData.append("type", "signature");
                      const { data } = await ApiClient.post(
                        "/upload",
                        formData
                      );
                      if (file._id && file.type === "signature") {
                        await updateFile(file?._id, {
                          ...(file as File),
                          ["url"]: data.message,
                        })
                          .then(() => setProgress(false))
                          .then(() =>
                            enqueueSnackbar(
                              "Your personal signature has been updated!",
                              {
                                variant: "success",
                              }
                            )
                          );
                      } else {
                        await createFile({
                          type: "signature",
                          parent_id: user?._id,
                          url: data.message,
                        } as File)
                          .then(() => setProgress(false))
                          .then(() =>
                            enqueueSnackbar(
                              "Your personal signature  has been created!",
                              {
                                variant: "success",
                              }
                            )
                          );
                      }
                    } catch (error: any) {
                      setProgress(false);
                      enqueueSnackbar("Error, try again!", {
                        variant: "error",
                      });
                      console.log({ error });
                    }
                  }
                }}
              />
              <Box
                border={1}
                borderRadius={1}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    borderColor: "black",
                    backgroundColor: "#F9F9F9",
                  },
                  borderColor: "gray",
                  padding: 1,
                }}
                display="flex"
                justifyContent="center"
              >
                <a
                  style={{
                    color: "black",
                    fontSize: 14,
                    fontWeight: "400",
                  }}
                >
                  ACCEPT & SIGN
                </a>
              </Box>
            </label>
          </Grid>
        </Grid>
      </Grid>
    </AccordionUi>
  );
};

export default MedicContract;
