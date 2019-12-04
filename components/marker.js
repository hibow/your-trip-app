import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import RoomIcon from '@material-ui/icons/Room';
import InfoWindow from "./markerinfo";

const useStyles = makeStyles(theme => ({
  icon: {
    color: 'red',
    cursor: 'pointer',
    zIndex: 10,
  }
}));

export default function Marker({show, place, text}) {
  const classes = useStyles();
  return (
    <>
  <RoomIcon className={classes.icon}>
  </RoomIcon>
  {show?
  <InfoWindow footprint = {place} text={text}></InfoWindow> : null}
  </>
  );
}
