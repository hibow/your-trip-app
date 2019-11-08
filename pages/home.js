//layout and redux
import {connect} from "react-redux";
import {fetchFootPrints, addFootPrints} from '../action/FPAction'

import Map from '../components/map';
import Listcard from '../components/listcard';
import Timeline from '../components/timeline2';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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

const Main = (props) => {

  const {getFootPrints} = props;
  const classes = useStyles();
  const footprints = [];
  console.log(props)
    return (

     <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs>
          <Paper className={classes.paper}>
            <Map data = {footprints}/>
          </Paper>
        </Grid>
        <Grid item xs = {5}>
          <Paper className={classes.paper} >
            {/* <div style={{background: 'blue'}}> */}
            <Listcard data = {props.state} />
            {/* </div> */}
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs>
          <Paper className={classes.paper} style={{background:"#f5f5f5"}}>
            <Timeline data = {footprints}/>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
 }

 Main.getInitialProps = async ({store, isServer, pathname, query}) => {
  await store.dispatch(fetchFootPrints());
  return { isServer}
 };

const mapStateToProps = state => ({
 state : state
});
const mapDispatchToProps = dispatch => {
  return {
    getFootPrints: () => dispatch(fetchFootPrints())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);