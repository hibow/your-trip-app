import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  infoWindowStyle :{
    position: 'relative',
    bottom: 45,
    left: '-45px',
    width: '200px',
    borderRadius: 10,
    backgroundColor: 'white',
    boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
    padding: 10,
    fontSize: '1rem',
    zIndex: 100,
  }
}));

export default function InfoWindow({text}) {
  const classes = useStyles();
  return (
<div className={classes.infoWindowStyle}>{text}</div>
  );
}
