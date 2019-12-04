import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Link from 'next/link';

const linkStyle = {
  marginRight: 15,
  fontSize:15,
  fontWeight: 500,
  textDecoration: 'none',
  color: 'white',
  textTransform: 'none'
}
const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(./static/myfootprint.png)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.between('xs','sm')]: {
      margin: theme.spacing(0, 0),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  h5 : {
    [theme.breakpoints.between('xs','sm')]: {
      fontSize: '1.1rem'
    },
  },
  h4: {
    [theme.breakpoints.between('xs','sm')]: {
      fontSize: '1.4rem'
    },
  }
}));

export const Landing = (props) => {
  const classes = useStyles();
  const {user} = props;

  return (
   <Grid container component="main" className={classes.root}>
   <Grid item xs={6} sm={6} md={6} className={classes.image} />
   <Grid item xs={6} sm={6} md={6} component={Paper} elevation={6} square>
   <div className={classes.paper}>
   <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justify="center"
  style={{ minHeight: '100vh' }}
  >
    <Typography variant="h5" className={classes.h5}>
    "Take only memories, leave only footprints." - Cheif Seattle
    </Typography>
    <p>
      {'\n'}
    </p>
       <Typography variant="h4" className={classes.h4}>

    We are here to create more valuable memories with you.
   </Typography>
   <p>
      {'\n'}
    </p>
    {!user?
    <Link href="/join">
    <a style={linkStyle}>
 <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
         Join In
            </Button>
            </a>
    </Link>
    :    <Link href="/home">
    <a style={linkStyle}>
 <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
         Join In
            </Button>
            </a>
    </Link>
    }
   </Grid>
   </div>
   </Grid>
   </Grid>
  )
}

export default connect(state => state, null)(Landing);