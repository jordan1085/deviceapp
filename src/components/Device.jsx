import { deleteDeviceAction, getUpdateDeviceAction } from "../store/device/ations";
import { getAlertByDeviceAction } from "../store/alerts/actions"
import { sendAlertAction } from "../store/alerts/actions";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import {
  makeStyles,
  createStyles,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  TextField,
  Divider
} from "@material-ui/core";

// Style card devices
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      maxWidth: 450,
    },
    button: {
      padding: theme.spacing(1),
      marginTop: theme.spacing(2)
    },
    card: {
      marginTop: theme.spacing(2)
    },
    divider: {
      width: '100%',
      marginTop: theme.spacing(3)
    },
    formroot: {
      marginRight: theme.spacing(2),
    },
    form: {
      "& > *": {
        margin: theme.spacing(1)
      },
    },
    alertSection: {
      marginTop: theme.spacing(2)
    },
    select: {
      width: '100%'
    }
  })
);


const Device = ({ data }) => {

  // Device data
  const { id, name, description } = data;

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  // React Hook Form
  const { control, formState: { isDirty, isValid }, handleSubmit } = useForm();

  // Delete device
  const deleteDevice = id => {
    dispatch(deleteDeviceAction(id))
  };

  // Simulation alert
  const handleRegistrationAlert = alertData => {
    dispatch(sendAlertAction(id, alertData))
  };

  // Edit device
  const handleEdit = device => {
    dispatch(getUpdateDeviceAction(device))
    history.push(`/device/edit/${device.id}`)
  };

  // Alerts by device
  const handleAlert = id => {
    dispatch(getAlertByDeviceAction(id))
    history.push(`/device/alerts/${id}`)
  };

  return (
    <Grid item xs={12} sm={3}>
      <Card className={classes.root}>
        <CardHeader title={name} />
        <CardContent>
          <Grid container>
            <Grid item xs={12}>
              <Typography
                variant="body2"
                color="textSecondary"
                component={"span"}
              >
                {description}
              </Typography>
            </Grid>

            {/* Edit */}
            <Grid item xs={6} className={classes.button}>
              <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={() => handleEdit(data)}
                fullWidth
              >
                Editar
              </Button>
            </Grid>

            {/* Delete */}
            <Grid item xs={6} className={classes.button}>
              <Button
                variant="contained"
                size="small"
                color="secondary"
                onClick={() => deleteDevice(id)}
                fullWidth
              >
                Eliminar
              </Button>
            </Grid>

            <Divider className={classes.divider} />

            <Grid item xs={12} className={classes.card} >
              <Typography color="textSecondary">
                Simulación de alerta
              </Typography>
            </Grid>

            <Grid item xs={12} className={classes.card}>
              <form
                onSubmit={handleSubmit(handleRegistrationAlert)}
              >
                <Controller
                  id="alertvalue"
                  name="alert"
                  className={classes.alertSection}
                  control={control}
                  render={({ field }) =>
                    <TextField
                      {...field}
                      id="filled-number"
                      label="Ingresa un valor"
                      type="number"
                      variant="filled"
                      fullWidth
                    />}
                />

                <Button
                  type="submit"
                  variant="contained"
                  className={classes.alertSection}
                  disabled={!isDirty || !isValid}
                  color="primary"
                  fullWidth
                >
                  Simular alerta
                </Button>

                <Button
                  fullWidth
                  className={classes.alertSection}
                  onClick={() => handleAlert(id)}
                  variant="outlined"
                  color="secondary"
                >
                  Ver alertas
                </Button>
              </form>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default Device;