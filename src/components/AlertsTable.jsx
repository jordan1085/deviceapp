import { useEffect } from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from "react-redux";
import { getAlertsAction, deleteAlertAction } from "../store/alerts/actions";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 18,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const AlertsTable = () => {

  const classes = useStyles();
  const dispatch = useDispatch();

  // Get devices render
  useEffect(() => {
    dispatch(getAlertsAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Alerts state
  const { alerts, loading, error } = useSelector((state) => state.alerts);
  
  // Delete alert
  const deleteAlert = id => {
    dispatch(deleteAlertAction(id))
  }

  return (
    <>
      {/* Alerts validation */}
      {error ? <p>Hubo un error</p> : null}
      {loading && null}

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Nombre </StyledTableCell>
              <StyledTableCell>Tipo</StyledTableCell>
              <StyledTableCell>Valor configurado</StyledTableCell>
              <StyledTableCell>Valor registrado</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alerts.map((alert, i) => (
              <StyledTableRow key={i}>
                <StyledTableCell component="th" scope="row">
                  {alert.alert_data.name}
                </StyledTableCell>
                <StyledTableCell>{alert.alert_data.type}</StyledTableCell>
                <StyledTableCell>{alert.alert_data.value || alert.alert_data.min + ' - ' + alert.alert_data.max}</StyledTableCell>
                <StyledTableCell>{alert.registered_value}</StyledTableCell>
                <StyledTableCell>
                  <Button 
                    variant="contained" 
                    color="secondary"
                    onClick={() => deleteAlert(alert.id)}
                  >
                    Eliminar
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default AlertsTable;