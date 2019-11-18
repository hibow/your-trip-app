import React from 'react';

//toDO: send auth to fb

const JOIN = () => {
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
  const handleSubmit = evt => {
    evt.preventDefault();
    console.log('cur:',state);
    //post back info
    //will change page?
    // setState(defaultState)
  }
  return (
    <form className="SignUp" onSubmit={handleSubmit}>
    <h2>Sign Up</h2>
    <input
      type="text"
      name="displayName"
      placeholder="Display Name"
      value={state.displayName}
      onChange={handleChange}
    />
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
    <input type="submit" value="Sign Up" />
  </form>
  )

}

export default JOIN;