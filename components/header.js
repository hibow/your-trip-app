import React from 'react';
import {connect} from "react-redux";
import {SignOutAction} from '../action/authAction';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import theme from '../lib/theme'
import Link from 'next/link';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    fontWeight: 450,
    textShadow: '1px',
    color: theme.palette.primary.second,
    [theme.breakpoints.between('md','lg')]: {
      fontSize: '2rem'
    },
    [theme.breakpoints.between('xs','sm')]: {
      fontSize: '1.4rem'
    },
  },
}));

const linkStyle = {
  marginRight: 15,
  textDecoration: 'none',
  color: theme.palette.primary.second,
}

const Header=(props) => {
  const classes = useStyles();
  const {user, signOut} = props;

  const handleLogout = async evt => {
    await evt.preventDefault();
    await signOut();
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Link href = "/">
            <a>
          <IconButton edge="start" color="inherit" aria-label="landing-page">
            <img src="./static/icon.png" width= "50" height="50"/>
          </IconButton>
          </a>
          </Link>
          <Typography variant="h4" className={classes.title}>
            MyFootPrint
          </Typography>
          {(!user)?
          <>
          <Button color="inherit">
          <Link href="/signin">
          <a style={linkStyle}>LOGIN</a>
           </Link>
            </Button>
          <Button color="inherit">
          <Link href="/join">
          <a style={linkStyle}>JOIN IN</a>
            </Link>
            </Button>
            </>
            :
          <Button color="inherit" onClick={handleLogout}>
          <Link href="/">
          <a style={linkStyle}>LOGOUT</a>
           </Link>
          </Button>}
        </Toolbar>
      </AppBar>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(SignOutAction()),
  }
};
export default connect(state => state, mapDispatchToProps)(Header);
