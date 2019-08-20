import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import theme from '../lib/theme'
import Link from 'next/link';
import { borderLeft } from '@material-ui/system';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: theme.palette.primary.second
  },
  title: {
    flexGrow: 1,
    fontWeight: 450,
    textShadow: '1px',
    color: theme.palette.primary.second
  },
}));

const linkStyle = {
  marginRight: 15,
  textDecoration: 'none',
  color: theme.palette.primary.second
}

export default function ButtonAppBar() {
  const classes = useStyles();
  const [toggle, setToggle ] = React.useState(false);
  function handleclick(e) {
    //change index page to landing page
    console.log('click')
    const text = e.target.innerText;
    setToggle(!toggle);
  }



  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" className={classes.title}>
            iFootPrint
          </Typography>
          {(!toggle)?
          <Button color="inherit" onClick={handleclick}>
          <Link href="/">
          <a style={linkStyle}>LOGIN</a>
           </Link>
            </Button>:
          <Button color="inherit" onClick={handleclick}>
          <Link href="/landing">
          <a style={linkStyle}>LOGOUT</a>
           </Link>
          </Button>}
        </Toolbar>
      </AppBar>
    </div>
  );
}
