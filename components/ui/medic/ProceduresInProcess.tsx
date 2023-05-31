import { FC, ReactNode, useState, useContext, useEffect } from "react";
import {
  Typography,
  Divider,
  Grid,
  IconButton,
  TableRow,
  TablePagination,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Paper,
} from "@mui/material";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { UIContext } from "../../../context/ui";
import { ProcedureContext } from "../../../context/procedure";
import { useSnackbar } from "notistack";
import { Medic } from "../../../interfaces";

interface Column {
  id: "client_name" | "product_procedure" | "date" | "status";
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "client_name", label: "Patient", minWidth: 70, align: "left" },
  { id: "product_procedure", label: "Procedure", minWidth: 60, align: "left" },
  {
    id: "date",
    label: "Date",
    minWidth: 70,
    align: "center",
    format: (value: number) => new Date(value).toLocaleDateString("en-GB"),
  },
  {
    id: "status",
    label: "Status",
    minWidth: 70,
    align: "center",
  },
];

interface Props {
  children?: ReactNode;
  medic: Medic;
}

export const ProceduresInProcess: FC<Props> = ({ medic }) => {
  const { procedures, getProceduresByMedicId } = useContext(ProcedureContext);

  useEffect(() => {
    getProceduresByMedicId(medic._id);
  }, [medic, getProceduresByMedicId]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { setProgress } = useContext(UIContext);
  const { enqueueSnackbar } = useSnackbar();
  const [values, setValues] = useState<any>();
  console.log(procedures);
  const success = (model: string, state: string) => {
    setProgress(false);
    enqueueSnackbar(`Your ${model} has been ${state}!`, { variant: "success" });
  };

  const unsuccess = (error: any) => {
    setProgress(false);
    enqueueSnackbar("Error, try again!", { variant: "error" });
    console.log({ error });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Divider />
      <Typography
        sx={{
          fontSize: 15,
          fontWeight: "500",
          borderRadius: 0,
          color: "#001B87",
          marginTop: 1.5,
          marginLeft: 2,
          marginBottom: 1.5,
        }}
      >
        Procedures in process
      </Typography>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, fontWeight: "600" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell
                  key="actions"
                  align="center"
                  style={{ minWidth: 120, fontWeight: "600" }}
                >
                  {"Actions"}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {procedures
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((procedure, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column, index) => {
                        const value = procedure[column.id];
                        return (
                          <TableCell key={index} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                      <TableCell>
                        <Grid container spacing={0} rowSpacing={2}>
                          <Grid item xs={6}>
                            <IconButton
                              size="small"
                              sx={{
                                borderRadius: 1,
                                color: "white",
                                backgroundColor: "darkblue",
                                borderColor: "darkblue",
                              }}
                            >
                              <ManageHistoryIcon/>
                            </IconButton>
                          </Grid>
                          <Grid item xs={6}>
                            <IconButton
                              size="small"
                              sx={{
                                borderRadius: 1,
                                color: "white",
                                backgroundColor: "green",
                                borderColor: "green",
                              }}
                            >
                              <CheckCircleOutlineIcon/>
                            </IconButton>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={procedures.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default ProceduresInProcess;
