import Map from '../components/map';
import Listcard from '../components/listcard';
// import List from '../components/list';
import Timeline from '../components/timeline2';
import Layout from '../components/layout';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { red, blue } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 20,
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    maxHeight: '100%',
    overflow: 'auto',
    // background: 'blue'
  },
  section: {
    // height: '500px',
    paddingTop: 5,
    backgroundColor: 'E6EE9C'
  }
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
        <Grid item xs = {5}>
          <Paper className={classes.paper} >
            {/* <div style={{background: 'blue'}}> */}
            <Listcard />
            {/* </div> */}
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
