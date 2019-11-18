import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DelIcon from '@material-ui/icons/Delete';
import Link from 'next/link';
import AddMdl from './modal';



const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
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
    backgroundColor: theme.palette.card.main
  },
  cardDetails: {
    flex: 1,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    width: '15vw',
    marginRight: 10
  },
  cardMedia: {
    width: '15vw',
  },
  button: {
    margin: theme.spacing(1),
  },
  icons: {
    position:  'absolute',
    right: '0px',
    top: '0px',
    display: 'flex',
    flexDirection: 'column'
  }
}));


const Item = (props) => {
  const classes = useStyles();

  const {post} = props;

  const [open, setOpen] = React.useState(false);
  console.log(props)
  const handleEdit = () => {
    console.log('edit');
    setOpen(true);
    console.log(open);

  }
  const handleDelete = () => {
    console.log('delete', props.post.title)
    //delete id
  }
  const handleClickClose = () => {
    setOpen(false);
    console.log('close item', open)
  }
  return (
    <>
    <ListItem >
    <Grid item key = {post.title} >
    <Link href="/fp/[id]" as={`/fp/${post.title}`}>
      <CardActionArea component="a">
        <Card className={classes.card}>
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
              <div>
              </div>
            </CardContent>
          </div>
        </Card>
      </CardActionArea>
      </Link>
    </Grid>
    <div className = {classes.icons}>
      <IconButton aria-label="edit" type= "button" onClick = {handleEdit} className={classes.margin}>
    <EditIcon />
    </IconButton>
  <IconButton aria-label="delete" value = {post.title} type = "button" onClick = {handleDelete} className={classes.margin}>
    <DelIcon />
    </IconButton>
    </div>
    <AddMdl state= {open} changeClose = {handleClickClose}></AddMdl>
    </ListItem>
    </>
  )
}

export default Item;
