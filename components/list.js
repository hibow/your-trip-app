import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Link from '@material-ui/core/Link';

import data from '../db/data';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  mainGrid: {
    marginTop: theme.spacing(0),
  },
  card: {
    display: 'flex',
    flexWrap: 'nowrap',
    width: '80vh',
    backgroundColor: theme.palette.card.main
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 250,
  },
}));

export default function Triplist() {
  const classes = useStyles();
  return (
       <List className={classes.root}>
        {data.map(post => (
              <ListItem alignItems="flex-start">
              <Grid item key={post.title} >
                <CardActionArea component="a" href="#">
                  <Card className={classes.card} >
                  <Hidden xsDown>
                      <CardMedia
                        className={classes.cardMedia}
                        image={post.photos[0]}
                        title= "photo"
                      />
                    </Hidden>
                    <div className={classes.cardDetails}>
                      <CardContent>
                        <Typography component="h2" variant="h5">
                          {post.title}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          {post.time}
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                          {post.summary}
                        </Typography>
                        <Typography variant="subtitle1" color="primary">
                          Continue reading...
                        </Typography>
                      </CardContent>
                    </div>

                  </Card>
                </CardActionArea>
              </Grid>
              </ListItem>
            ))}
          </List>
  );
}
