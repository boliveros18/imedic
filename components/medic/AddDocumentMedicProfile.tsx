import { FC, ReactNode, useContext } from "react";
import { Grid } from "@mui/material";
import { ApiClient } from "../../apis";
import { MedicContext } from "../../context/medic";
import { FileContext } from "../../context/file";
import { Medic, File } from "../../interfaces";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useSnackbar } from "notistack";
import { UIContext } from "../../context/ui";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface Props {
  children?: ReactNode;
  type: string;
  text: string;
}

export const AddDocumentMedicProfile: FC<Props> = ({ type, text }) => {
  const { medic, updateMedic } = useContext(MedicContext);
  const { files, updateFile, createFile, getFilesByParentIdAndType } =
    useContext(FileContext);
  const { setProgress } = useContext(UIContext);
  const { enqueueSnackbar } = useSnackbar();
  const dossier = files.filter((i: File) => i.type === type);

  const upload = async (type: string, target: any) => {
    setProgress(true);
    if (target.files) {
      try {
        const file = await getFilesByParentIdAndType(medic._id, type);
        const files = target.files[0];
        const formData = new FormData();
        formData.append("file", files);
        formData.append("id", medic._id);
        formData.append("type", type);
        const { data } = await ApiClient.post("/upload", formData);
        if (medic._id) {
          await updateMedic(medic?._id, {
            ...(medic as Medic),
          });
          if (file._id && file.type === type) {
            await updateFile(file?._id, {
              ...(file as File),
              ["url"]: data.message,
            })
              .then(() => setProgress(false))
              .then(() =>
                enqueueSnackbar(`Your ${type} data profile has been updated`, {
                  variant: "success",
                })
              );
          } else {
            await createFile({
              type: type,
              parent_id: medic?._id,
              url: data.message,
              status: "pending",
            } as File)
              .then()
              .then(() => setProgress(false))
              .then(() =>
                enqueueSnackbar(`Your ${type} data profile has been created`, {
                  variant: "success",
                })
              );
          }
        }
      } catch (error) {
        console.log({ error });
      }
    }
  };

  return (
    <Grid item xs={12} display="flex" justifyContent="end">
      <label>
        <input
          type="file"
          hidden
          accept="application/pdf"
          onChange={async ({ target }) => {
            upload(type, target);
          }}
        />
        <a
          style={{
            fontSize: 14,
            fontWeight: "500",
            color: "#001B87",
            cursor: "pointer",
          }}
        >
          {dossier.length === 1 ? (
            <CheckCircleIcon
              sx={{
                color:
                  dossier[0].status === "verified"
                    ? "blue"
                    : dossier[0].status === "pending"
                    ? "lightgray"
                    : "red",
                fontSize: "15px",
                marginBottom: -0.2,
                marginRight: 1,
              }}
            />
          ) : null}
          {text +
            (dossier[0]?.status === "verified"
              ? "verified"
              : dossier[0]?.status === "pending"
              ? "is pending"
              : dossier[0]?.status === "rejected"
              ? "Please upload again"
              : "please upload")}
          <KeyboardArrowRightIcon sx={{ mb: -0.6 }} fontSize="small" />
        </a>
      </label>
    </Grid>
  );
};

export default AddDocumentMedicProfile;
