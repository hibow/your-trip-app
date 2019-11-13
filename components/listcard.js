import List from './list';
import Greeting from './greeting';
import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import data from '../db/data';
import ActBtn from './addmodal';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));
export default function Listcard({data}) {
  console.log('what is data?', data);
  // static propTypes = {
  //   url: PropTypes.string.isRequired,
  //   author: PropTypes.string.isRequired,
  //   perPage: PropTypes.number.isRequired,
  // };
    const classes = useStyles();
    return (
      <div style={{ height: '80vh'}}>
<Grid
  container
  spacing={2}
  direction="column"
  alignItems='flex-start'
  // direction = 'column'
  justify='space-between'
  >
      <Greeting/>
      <Fab size = "small" color="primary" aria-label="add" className={classes.fab}>
        <ActBtn/>
      </Fab>
      </Grid>
        <List/>
        </div>
    );
  }
