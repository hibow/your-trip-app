import React from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {SetCurUser, GetUser, SignUpAction, createUserDocument, getUserDocument} from '../action/authAction';
import Router from "next/router";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
  signupForm: {
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


const JOIN = (props) => {

  const classes = useStyles();
  const {signUp, user} = props;
  console.log('signup page: ', props)
  const defaultState = {
    displayName: '',
    email: '',
    password: ''
  }
  const [state, setState] = React.useState(defaultState);
  // const [password, setPassword] = React.useState('');
  const handleChange = evt => {
    const {name, value} = evt.target;
    // console.log(name, value);
    const cloneState = {...state, ...{[name]: value}};
    // console.log(cloneState)
    setState(cloneState);
    // console.log(state);
  }
  const handleSubmit = async evt => {
    evt.preventDefault();
    console.log('cur:',state);
    await signUp(state.email, state.displayName, state.password);
    console.log('current sign up user:', user)
    //will change page?
    // let uid  = await GetUser();
    if (GetUser()|| user) {
      console.log('leave!')
      await Router.push('/home');
    }
    await console.log('stay!')
    // setState(defaultState)
  }
  return (
    <Container maxWidth="sm">
        <Paper className={classes.root}>
    <Typography variant="h4" component="div" className = {classes.textDiv}>
      Sign Up
    </Typography>
    <form className={classes.signupForm} onSubmit={handleSubmit}>
    <TextField
         type="text"
          id="displayName-input"
          name="displayName"
          className={classes.textField}
          label="displayName"
          margin="normal"
          value={state.displayName}
          onChange={handleChange}
        />
    <TextField
         type="email"
          id="email-input"
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
  Sign Up
  </Button>
  </form>
  </Paper>
  </Container>
  )

}

// export default JOIN;
const mapDispatchToProps = (dispatch) => {
  return {
    // selectFP: fp => dispatch(selectFootPrint(fp)),
    signUp: (email, displayName, password) => dispatch(SignUpAction(email, displayName, password))
  }
};

export default connect(state => state, mapDispatchToProps)(JOIN);