import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { createNewDeviceAction } from "../store/device/ations";
import {
  makeStyles,
  createStyles,
  Grid,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@material-ui/core";

// Styles component use makestyle
const useStyles = makeStyles((theme) =>
  createStyles({
    form: {
      "& > *": {
        margin: theme.spacing(1)
      },
      maxWidth: 300,
      marginRight: theme.spacing(1)
    },
    select: {
      width: "100%"
    }
  })
);

const CreateDevice = () => {
  //Styles hook
  const classes = useStyles();

  // Dispatch hook
  const dispatch = useDispatch();
  
  // Hook form handle submit
  const { control, formState: { errors, isDirty, isValid }, handleSubmit, reset } = useForm();

  // Dialog open and close state
  const [open, setOpen] = useState(false);

  // Input type alert
  const [type, setType] = useState('');

  const handleChange = (event) => {
    setType(event.target.value)
  }

  // Create new device
  const handleRegistration = device => {
    const { name, description, alert_name, value, min, max } = device;

    const newDevice = {
      name,
      description,
      alert_config: {
        name: alert_name,
        type,
        value: Number(value),
        min: Number(min),
        max: Number(max)
      }
    }
    console.log(newDevice);
    dispatch(createNewDeviceAction(newDevice))
  }

  // Open form modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Close form modal
  const handleClose = () => {
    setOpen(false)

    // Reset form data
    setTimeout(() => {
      reset()
    }, 100)
  };

  return (
    <>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
        >
          Crear Dispositivo
        </Button>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Crear Nuevo Dispositivo"}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-description">
            <form
              onSubmit={handleSubmit(handleRegistration)}
              className={classes.form}
            >

              <Controller
                id="name"
                name="name"
                control={control}
                rules={{ required: "Este campo es requerido" }}
                render={({ field }) =>
                  <TextField
                    {...field}
                    label="Nombre"
                    variant="outlined"
                    fullWidth
                  />}
              />
              <ErrorMessage
                errors={errors}
                name="name"
              />

              <Controller
                id="description"
                name="description"
                control={control}
                rules={{ required: "Este campo es requerido" }}
                render={({ field }) =>
                  <TextField
                    {...field}
                    label="Descripcion"
                    rows={2}
                    multiline
                    variant="outlined"
                    fullWidth
                  />}
              />
              <ErrorMessage
                errors={errors}
                name="description"
              />

              <Controller
                id="alertname"
                name="alert_name"
                control={control}
                render={({ field }) =>
                  <TextField
                    {...field}
                    label="Nombre de la alerta"
                    variant="outlined"
                    fullWidth
                  />}
              />


              <FormControl className={classes.select} variant="filled">
                <InputLabel id="type_alert">Selecciona un tipo de alerta</InputLabel>
                <Select
                  labelId="type_alert"
                  id="alerttype"
                  onChange={handleChange}
                  defaultValue=""
                >
                  <MenuItem value={'POR_VALOR'}>POR_VALOR</MenuItem>
                  <MenuItem value={'FUERA_DE_RANGO'}>FUERA_DE_RANGO</MenuItem>
                </Select>
              </FormControl>
              {type === 'POR_VALOR' ? (
                  <Controller
                    id="value"
                    name="value"
                    type="number"
                    control={control}
                    rules={{ required: "Este campo es requerido" }}
                    render={({ field }) =>
                      <TextField
                        {...field}
                        type="number"
                        label="Valor de la alerta"
                        variant="outlined"
                        fullWidth
                      />}
                  />

              ) : type === 'FUERA_DE_RANGO' ? (
                <>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Controller
                        id="min"
                        name="min"
                        control={control}
                        rules={{ required: "Este campo es requerido" }}
                        render={({ field }) =>
                          <TextField
                            {...field}
                            type="number"
                            label="Valor minimo"
                            variant="outlined"
                          />}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <Controller
                        id="max"
                        name="max"
                        control={control}
                        rules={{ required: "Este campo es requerido" }}
                        render={({ field }) =>
                          <TextField
                            {...field}
                            type="number"
                            label="Valor maximo"
                            variant="outlined"
                          />}
                      />
                    </Grid>
                  </Grid>
                </>
              ) : null}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleClose}
                disabled={!isDirty || !isValid}
                fullWidth
              >
                Crear Dispositivo
              </Button>

            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateDevice;