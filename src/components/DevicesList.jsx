import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDevicesAction } from "../store/device/ations";
import Alert from '@material-ui/lab/Alert';
import Device from './Device';
import CreateDevice from './CreateDevice';
import {
  makeStyles,
  createStyles,
  Grid
} from "@material-ui/core";

// Styles component use makestyle
const useStyles = makeStyles((theme) =>
  createStyles({
    head: {
      marginBottom: theme.spacing(3)
    },
  })
);

const DevicesList = () => {
  //Styles hook
  const classes = useStyles();

  // Dispatch hook
  const dispatch = useDispatch();

  // Get devices render
  useEffect(() => {
    dispatch(getDevicesAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get state from redux
  const { devices, loading, error } = useSelector((state) => state.devices);
  const { generateAlert } = useSelector((state) => state.alerts);

  return (
    <>
      <Grid container className={classes.head}>
        {/* Form to create a new device */}
        <Grid item xs={4}>
          <CreateDevice />
        </Grid>

        {/* Alert message */}
        <Grid item xs={8}>
          {generateAlert ? (
            <Alert variant="filled" severity="error">
              {generateAlert}
            </Alert>
          ) : null}
        </Grid>
      </Grid>

      {/* Main content */}
      <Grid
        container
        spacing={2}
      >
        {/* Devices list validation */}
        {error ? <p>Hubo un error</p> : null}
        {loading && null}

        {/* Devices list  */}
        {devices.length === 0 ? 'No hay dispositivos creados' : (
          devices.map((device) => (
            <Device
              key={device.id}
              data={device}
            />
          )))}
      </Grid>
    </>
  )
}

export default DevicesList;