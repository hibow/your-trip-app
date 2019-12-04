import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Item from './item'



const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const FPlist = ({footprints})=>{
  const classes = useStyles();
  return (
       <List className={classes.root}>
         {footprints.map((post) => (
          <Item post = {post} key = {post.id}></Item>
            ))}
          </List>
  );
}

export default FPlist;
