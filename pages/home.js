import {connect} from "react-redux";
import {fetchFootPrints} from '../action/FPAction';
import 'regenerator-runtime/runtime';
import Map from '../components/map';
import Listcard from '../components/listcard';
// import Timeline from '../components/timeline2';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Router from "next/router";

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 20,
    flexGrow: 1,
  },
  container : {
    [theme.breakpoints.between('xs','sm')]: {
      flexWrap: 'nowrap',
      flexDirection:'column-reverse'
    },
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    maxHeight: '100%',
    overflow: 'auto',
  },
  listPaper : {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    maxHeight: '100%',
    overflow: 'auto',
    maxWidth:  '50vw',
    [theme.breakpoints.between('xs','sm')]: {
      maxWidth:  '100%',
      maxHeight: '30vh',
    },
  },
  section: {
    paddingTop: 5,
    backgroundColor: 'E6EE9C'
  }
}));

const Main = (props) => {

  const {user,footprints, initialState} = props;
  let sortedfootprints = [...footprints];
  sortedfootprints.sort(function (a, b) {
    return b['travelDate'].localeCompare(a['travelDate']);
  });
  if (!user) {
    Router.push('/');
  }
  const [renderFPS, setFPS] = React.useState(sortedfootprints);

  const onMapClick = (key) => {
  if (typeof key === 'string') {
    let tempFPs = [...sortedfootprints];
    let filterFPs = tempFPs.filter(e => e.id === key);
    setFPS(filterFPs);
    } else {
    setFPS(sortedfootprints);
    }
  }

  console.log('user at home:', initialState)
  const classes = useStyles();
    return (

     <div className={classes.root}>
      <Grid container spacing={2} className ={classes.container}>
        <Grid item sm = {8} md = {8}>
          <Paper className={classes.paper}>
            <Map footprints= {sortedfootprints} onMapClick = {onMapClick}/>
          </Paper>
        </Grid>
        <Grid item sm = {8} md = {4}>
          <Paper className={classes.listPaper} >
            {(sortedfootprints.length !== renderFPS.length && renderFPS.length !== 1)?
            <Listcard footprints = {sortedfootprints} user= {user}/>
             :
             <Listcard footprints = {renderFPS} user= {user}/>}
          </Paper>
        </Grid>
      </Grid>
      {/* <Grid container spacing={2}>
        <Grid item xs>
          <Paper className={classes.paper} style={{background:"#f5f5f5"}}>
            <Timeline data = {footprints}/>
          </Paper>
        </Grid>
      </Grid> */}
    </div>
  );
 }

 Main.getInitialProps = async ({store, isServer, pathname, query}) => {

  await store.dispatch(fetchFootPrints());
  return { initialState: store.getState(), isServer}
 };

const mapStateToProps = state => ({
 ...state
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