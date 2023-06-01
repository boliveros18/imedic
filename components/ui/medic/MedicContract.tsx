import { FC, ReactNode, useContext, useMemo } from "react";
import AccordionUi from "../utils/AccordionUi";
import { Box, Container, Grid } from "@mui/material";
import { ApiClient } from "../../../apis";
import { UIContext } from "../../../context/ui";
import { Medic, File } from "../../../interfaces";
import { useSnackbar } from "notistack";
import { FileContext } from "../../../context/file";
import { TermsOfUse } from "../utils/TermsOfUse";

interface Props {
  children?: ReactNode;
  medic: Medic;
}

export const MedicContract: FC<Props> = ({ medic }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { setProgress } = useContext(UIContext);
  const { file, updateFile, createFile, getFilesByParentIdAndType } =
    useContext(FileContext);

  return (
    <AccordionUi summary="Medic Commitments">
      <Grid container spacing={0} rowSpacing={2}>
        <Grid item xs>
          <Container sx={{}}>
            <Box sx={{ width: "100%" }}>
             <TermsOfUse/>
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
                      await getFilesByParentIdAndType(medic._id, "signature");
                      const files = target.files[0];
                      const formData = new FormData();
                      formData.append("file", files);
                      formData.append("id", medic?._id || "");
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
                          parent_id: medic?._id,
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
