import Map from '../components/map';
import List from '../components/list';
import Timeline from '../components/timeline';
import Layout from '../components/layout';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function Main() {
  const classes = useStyles();

  return (
   <Layout>
     <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs>
          <Paper className={classes.paper}>
            <Map/>
          </Paper>
        </Grid>
        <Grid item xs  = {15}>
          <Paper className={classes.paper}>
            <List/>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs>
          <Paper className={classes.paper}>
            <Timeline />
          </Paper>
        </Grid>
      </Grid>
    </div>
   </Layout>
  )
}
