import Layout from '../components/layout';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
const linkStyle = {
  marginRight: 15,
  textDecoration: 'none',
  color: 'white'
}
const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://images.unsplash.com/photo-1516546453174-5e1098a4b4af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Landing() {
  const classes = useStyles();
  //need to change toggle status
  return (
   <Layout>
   <Grid container component="main" className={classes.root}>
   <Grid item xs={false} sm={4} md={7} className={classes.image} />
   <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
   <div className={classes.paper}>
   <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justify="center"
  style={{ minHeight: '100vh' }}
  >
       <Typography component="h1" variant="h5">
    We are here to accompolish your dreams with you.
   </Typography>
 <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
          <Link href="/">
          <a style={linkStyle}>Get Started!</a>
           </Link>
            </Button>
   </Grid>
   </div>
   </Grid>
   </Grid>
   </Layout>
  )
}
