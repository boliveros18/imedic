import { FC, ReactNode, useState, useContext, useEffect, useMemo } from "react";
import {
  Typography,
  Divider,
  Grid,
  Box,
  IconButton,
  TableRow,
  TablePagination,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Paper
} from "@mui/material";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { UIContext } from "../../../context/ui";
import { CalendarContext } from "../../../context/calendar";
import { useSnackbar } from "notistack";
import { Medic } from "../../../interfaces";

interface Column {
  id: "client_name" | "product_procedure" | "date" | "status" | "actions";
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "client_name", label: "Patient", minWidth: 170 },
  { id: "product_procedure", label: "Procedure", minWidth: 100 },
  {
    id: "date",
    label: "Date",
    minWidth: 170,
    align: "center"
  },
  {
    id: "status",
    label: "Status",
    minWidth: 170,
    align: "center"
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 170,
    align: "center",
  },
];

interface Props {
  children?: ReactNode;
  medic: Medic;
}

export const ProceduresInProcess: FC<Props> = ({ medic }) => {

  const { calendar, createCalendar, updateCalendar, getCalendarByMedicId } =
    useContext(CalendarContext);

  useEffect(() => {
    getCalendarByMedicId(medic._id);
  }, [medic, getCalendarByMedicId]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { setProgress } = useContext(UIContext);
  const { enqueueSnackbar } = useSnackbar();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [values, setValues] = useState<any>();
  useMemo(() => setValues(calendar.availables_dates), [calendar]);
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

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box border={1} sx={{ borderRadius: 1, borderColor: "lightgray" }}>
      <Typography
        align="center"
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
      <Divider />
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {procedures
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(( procedures ) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={procedures.code}>
                    {columns.map((column) => {
                      const value = procedures[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
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
      <Grid container spacing={0} rowSpacing={2}>
        <Grid item xs={2}></Grid>
        <Grid item xs={1}>
          <IconButton
            size="small"
            sx={{
              borderRadius: 1,
              color: "white",
              backgroundColor: "darkblue",
              borderColor: "darkblue",
            }}
          >
            <ManageHistoryIcon />
          </IconButton>
        </Grid>
        <Grid item xs={1}>
          <IconButton
            size="small"
            sx={{
              borderRadius: 1,
              color: "white",
              backgroundColor: "green",
              borderColor: "green",
              marginBottom: 2,
            }}
          >
            <CheckCircleOutlineIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProceduresInProcess;
