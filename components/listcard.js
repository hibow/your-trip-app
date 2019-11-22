import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from './list';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import AddMdl from './modal';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  },
}));
export default function Listcard({footprints, user}) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  }
  const handleClickClose = () => {
    setOpen(false);
  }
    const classes = useStyles();
    return (
      <div style={{ height: '80vh'}}>
      <Grid
        container
        spacing={2}
        direction="row"
        alignItems='flex-start'
        justify='space-between'
        >
      <div style={{paddingTop: '20px', display:'flex', direction:'row'}}>
        <Typography variant="h4">
        Hello {(user.displayName? user.displayName: 'Friend')}! Drop some footprints?
        </Typography>
      </div>
      <Fab size = "small" color="primary" aria-label="add" className={classes.fab}>
        <AddIcon aria-label="add" type = "button" onClick={handleClickOpen}>
      </AddIcon>
      <AddMdl state= {open} changeClose = {handleClickClose}></AddMdl>
      </Fab>
        <List footprints = {footprints}/>
      </Grid>
        </div>
    );
  }
