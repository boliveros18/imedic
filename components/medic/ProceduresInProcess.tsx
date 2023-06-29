import { FC, ReactNode, useState, useContext, useEffect } from "react";
import {
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
  Tooltip,
} from "@mui/material";
import Link from "next/link";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { UIContext } from "../../context/ui";
import { ProcedureContext } from "../../context/procedure";
import { MedicContext } from "../../context/medic";
import { columns } from "../../utils/constants";
import { useSnackbar } from "notistack";
import { Medic, Procedure } from "../../interfaces";
import AccordionUi from "../ui/utils/AccordionUi";

interface Props {
  children?: ReactNode;
}

export const ProceduresInProcess: FC<Props> = ({}) => {
  const { procedures, getProceduresByMedicId, updateProcedure } =
    useContext(ProcedureContext);
  const { medic, updateMedic } = useContext(MedicContext);

  useEffect(() => {
    getProceduresByMedicId(medic._id);
  }, [medic, getProceduresByMedicId]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { setProgress } = useContext(UIContext);
  const { enqueueSnackbar } = useSnackbar();
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState("Pending");

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

  const updatingFunction = async (date: number) => {
    try {
      setProgress(true);
      await updateMedic(medic._id || "", {
        availables_dates: medic.availables_dates.filter(
          (date) => date !== procedures[index].date
        ),
        updatedAt: Date.now(),
      } as Medic).then(async () => {
        await updateProcedure(procedures[index]._id || "", {
          status: status,
          date: date,
          updatedAt: Date.now(),
        } as Procedure);
        getProceduresByMedicId(medic._id);
        success("calendar and procedure", "updated");
      });
    } catch (error: any) {
      unsuccess(error);
    }
  };

  const handleSubmit = () => {
    if (status === "Reassigned") {
      updatingFunction(0);
    }
    if (status === "Accepted") {
      updatingFunction(procedures[index].date);
    }
    setProgress(false);
  };

  return (
    <AccordionUi summary="Procedures In Process">
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
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                      onMouseEnter={() => setIndex(index)}
                    >
                      {columns.map((column, index) => {
                        const value = procedure[column.id];
                        return (
                          <TableCell key={index} align={column.align}>
                            {column.format && typeof value === "number" ? (
                              column.format(value)
                            ) : index === 0 ? (
                              <Link href={`/user/${procedure.client_id}`}>
                                <a
                                  style={{
                                    textDecoration: "none",
                                    fontWeight: "600",
                                  }}
                                >
                                  {value}
                                </a>
                              </Link>
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                      <TableCell>
                        <Grid container spacing={0} rowSpacing={2}>
                          <Grid item xs={6}>
                            <Tooltip
                              title="SEND BACK TO REASSIGN OTHER DATE"
                              sx={{ fontSize: 16 }}
                            >
                              <span>
                                <IconButton
                                  size="small"
                                  disabled={
                                    procedures[index].status === "Pending"
                                      ? false
                                      : true
                                  }
                                  sx={{
                                    borderRadius: 1,
                                    color: "white",
                                    backgroundColor: "#2874A6",
                                    borderColor: "#2874A6",
                                    width: 25,
                                    height: 25,
                                  }}
                                  onMouseEnter={() => setStatus("Reassigned")}
                                  onClick={handleSubmit}
                                >
                                  <ManageHistoryIcon
                                    sx={{ width: 18, height: 18 }}
                                  />
                                </IconButton>
                              </span>
                            </Tooltip>
                          </Grid>
                          <Grid item xs={6}>
                            <Tooltip title="ACCEPT AND SCHEDULE PROCEDURE">
                              <span>
                                <IconButton
                                  size="small"
                                  disabled={
                                    procedures[index].status === "Pending"
                                      ? false
                                      : true
                                  }
                                  sx={{
                                    borderRadius: 1,
                                    color: "white",
                                    backgroundColor: "#4FC541",
                                    borderColor: "#4FC541",
                                    width: 25,
                                    height: 25,
                                  }}
                                  onMouseEnter={() => setStatus("Accepted")}
                                  onClick={handleSubmit}
                                >
                                  <CheckCircleOutlineIcon
                                    sx={{ width: 18, height: 18 }}
                                  />
                                </IconButton>
                              </span>
                            </Tooltip>
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
    </AccordionUi>
  );
};

export default ProceduresInProcess;
