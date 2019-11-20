import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Item from './item'



const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const FPlist = (props)=>{
  const classes = useStyles();
  const {footprints} = props;

  return (
       <List className={classes.root}>
        {footprints.map((post) => (
          <Item post = {post} key = {post.title}></Item>
            ))}
          </List>
  );
}

export default connect(state => state, null)(FPlist);