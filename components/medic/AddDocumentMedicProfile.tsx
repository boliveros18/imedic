import { FC, ReactNode, useContext, useEffect } from "react";
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
  medic: Medic;
  type: string;
  text: string;
  handleSubmit: any;
}

export const AddDocumentMedicProfile: FC<Props> = ({ medic, type, text, handleSubmit }) => {
  const { updateMedic } = useContext(MedicContext);
  const { file, updateFile, createFile, getFilesByParentIdAndType } =
    useContext(FileContext);
  const { setProgress } = useContext(UIContext);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getFilesByParentIdAndType(medic._id, type);
  }, [medic, type, getFilesByParentIdAndType]);

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
              .then(() =>{
                enqueueSnackbar(`Your ${type} data profile has been updated`, {
                  variant: "success",
                });}
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
              .then(() =>{
                enqueueSnackbar(`Your ${type} data profile has been created`, {
                  variant: "success",
                }) }
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
            <CheckCircleIcon
              sx={{
                color:
                file.type === type ? ( file.status === "verified"
                    ? "blue"
                    : file.status === "pending"
                    ? "lightgray"
                    : "red") : "red",
                fontSize: "15px",
                marginBottom: -0.2,
                marginRight: 1,
              }}
            />
          {text + (file.type === type
            ? file.status === "verified"
              ? "verified"
              : file.status === "pending"
              ? "in progress"
              : file.status === "rejected"
              ? "Please upload again"
              : "please upload"
            : "please upload")}
          <KeyboardArrowRightIcon sx={{ mb: -0.6 }} fontSize="small" />
        </a>
      </label>
    </Grid>
  );
};

export default AddDocumentMedicProfile;
