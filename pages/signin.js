import React from 'react';
import { signInWithGoogle } from '../firebase/auth';
//to Do: send to fb for auth /google

const SignIn = () => {
  const defaultState = {
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
  const handleSubmit = evt => {
    evt.preventDefault();
    console.log('cur:',state);
    //post back info
    setState(defaultState)
  }
  return (
    <form className="SignIn" onSubmit={handleSubmit}>
    <h2>Sign In</h2>
    <input
      type="email"
      name="email"
      placeholder="Email"
      value={state.email}
      onChange={handleChange}
    />
    <input
      type="password"
      name="password"
      placeholder="Password"
      value={state.password}
      onChange={handleChange}
    />
    <input type="submit" value="Sign In" />
    <button onClick={signInWithGoogle}>Sign In With Google</button>
  </form>
    )
  }

export default SignIn;
//redux
//how to store sign in info?(make it like post query?) to get user info from db ?
//maptodispatch and run it in render components