import React from 'react';
import { signInWithGoogle } from '../firebase/auth';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
//to Do: send to fb for auth /google

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
  signinForm: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column'
    // flexWrap: 'wrap',
  },
  textDiv: {
    textAlign: 'center'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
}));


const SignIn = () => {

  const classes = useStyles();
  const defaultState = {
    email: '',
    password: ''
  }
  const [state, setState] = React.useState(defaultState);
  // const [password, setPassword] = React.useState('');
  const handleChange = evt => {
    const {name, value} = evt.target;
    console.log(name, value);
    const cloneState = {...state, ...{[name]: value}};
    console.log(cloneState)
    setState(cloneState);
    // console.log(state);
  }
  const handleSubmit = evt => {
    evt.preventDefault();
    console.log('cur:',state);
    //post back info
    setState(defaultState)
  }
  return (
    <Container maxWidth="sm">
        <Paper className={classes.root}>
    <Typography variant="h4" component="div" className = {classes.textDiv}>
      Sign In
    </Typography>
    <form className={classes.signinForm} onSubmit={handleSubmit}>
    <TextField
          id="email"
          name="email"
          className={classes.textField}
          label="email"
          margin="normal"
          value={state.email}
          onChange={handleChange}
        />
      <TextField
        id="standard-password-input"
        name="password"
        label="password"
        className={classes.textField}
        type="password"
        autoComplete="current-password"
        margin="normal"
        value={state.password}
        onChange={handleChange}
      />
  <Button variant="outlined" type="submit" color="primary" className={classes.button}>
    Sign In
  </Button>
  <Button variant="outlined" color="primary" className={classes.button} onClick={signInWithGoogle}>
  Sign In With Google
  </Button>
  </form>
  </Paper>
  </Container>
    )
  }

export default SignIn;
//redux
//how to store sign in info?(make it like post query?) to get user info from db ?
//maptodispatch and run it in render components