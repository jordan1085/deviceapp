// /* eslint-disable no-nested-ternary */
import React from "react";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import AppsIcon from '@material-ui/icons/Apps';
import { Link } from "react-router-dom";
import {
  createStyles,
  makeStyles,
  ListSubheader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    }
  })
);

export default function MenuOptions() {
  const classes = useStyles();

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Menu
        </ListSubheader>
      }
    >
      <ListItem button component={Link} to="/">
        <ListItemIcon>
          <AppsIcon />
        </ListItemIcon>
        <ListItemText primary="Dispositivos" />
      </ListItem>

      <ListItem button component={Link} to="/alerts">
        <ListItemIcon>
          <ErrorOutlineIcon />
        </ListItemIcon>
        <ListItemText primary="Alertas" />
      </ListItem>
    </List>
  );
}
