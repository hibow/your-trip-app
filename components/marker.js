import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import RoomIcon from '@material-ui/icons/Room';

const useStyles = makeStyles(theme => ({
  icon: {
    color: 'red'
  }
}));

export default function Marker() {
  const classes = useStyles();
  return (
  <RoomIcon className={classes.icon}>
  </RoomIcon>
  );
}
