import React from 'react';
import { connect } from 'react-redux';
import { signInWithGoogle } from '../action/authAction';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Router from "next/router";
import {SignInAction, GetUser} from '../action/authAction';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
  signinForm: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column'
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


const SignIn = (props) => {

  const classes = useStyles();
  const {signIn, user, SignInWGoogle} = props;
  const defaultState = {
    email: '',
    password: ''
  }
  const [state, setState] = React.useState(defaultState);

  const handleChange = evt => {
    const {name, value} = evt.target;
    const cloneState = {...state, ...{[name]: value}};
    setState(cloneState);
  }
  const handleSubmit = async evt => {
    evt.preventDefault();
    await signIn(state.email, state.password);
    await setState(defaultState);
    await GetUser(user, '/home');

  }
  const handleGoogle = async evt => {
    evt.preventDefault();
    await SignInWGoogle();
    await GetUser(user, '/home');
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
  <Button variant="outlined" color="primary" className={classes.button} onClick={handleGoogle}>
  Sign In With Google
  </Button>
  </form>
  </Paper>
  </Container>
    )
  }

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (email, password) => dispatch(SignInAction(email, password)),
    SignInWGoogle: () => dispatch(signInWithGoogle()),
  }
};

export default connect(state => state, mapDispatchToProps)(SignIn);