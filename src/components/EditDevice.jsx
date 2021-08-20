import { useState, useEffect } from "react";
import { updateDeviceAction } from "../store/device/ations";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import {
  makeStyles,
  createStyles,
  Card,
  CardHeader,
  CardContent,
  Button,
  TextField,
} from "@material-ui/core";

// Style card devices
const useStyles = makeStyles((theme) =>
  createStyles({
    formroot: {
      marginRight: theme.spacing(2),
    },
    form: {
      "& > *": {
        margin: theme.spacing(1)
      },
    },
    select: {
      width: '100%'
    }
  })
);

const EditDevice = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const { devicetoedit } = useSelector((state) => state.devices);

  const [device, setDevice] = useState({
    id: null,
    name: '',
    description: '',
    alert_config: {
      name: '',
      type: '',
      value: null,
      min: null,
      max: null
    },
    createdAt: '',
    updatedAt: ''
  });

  useEffect(() => {
    setDevice(devicetoedit);
  }, [devicetoedit]);

  const onChangeForm = e => {
    setDevice({
      ...device,
      [e.target.name]: e.target.value
    })
  }

  const submitEditDevice = e => {
    e.preventDefault();
    dispatch(updateDeviceAction(device.id, device));

    history.push('/');
  }

  return (
    <Card >
      <CardHeader title={device.name}/>
      <CardContent>
        <form
          onSubmit={submitEditDevice}
          className={classes.form}
        >
          <TextField
            id="name"
            name="name"
            label="Nombre del dispositivo"
            value={device.name}
            variant="outlined"
            onChange={(e) => onChangeForm(e)}
            fullWidth
          />
          <TextField
            id="description"
            name="description"
            label="Descripción del dispositivo"
            variant="outlined"
            onChange={(e) => onChangeForm(e)}
            value={device.description}
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Editar Dispositivo
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default EditDevice;