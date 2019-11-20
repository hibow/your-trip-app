import React from 'react';
import { connect } from 'react-redux';
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
import {selectFootPrint, deleteFootPrint} from '../action/FPAction';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    flexWrap: 'nowrap',
    backgroundColor: theme.palette.card.main
  },
  cardDetails: {
    flex: 1,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    width: '13vw',
    marginRight: 10
  },
  cardMedia: {
    width: '15vw',
  },
  button: {
    margin: theme.spacing(1),
  },
  box: {
    paddingTop: '20px',
    overflow: 'auto'
  },
  icons: {
    display: 'flex',
    flexDirection: 'row'
  }
}));


const Item = (props) => {
  const classes = useStyles();

  const {currentFP, selectFP, post, delFP} = props;
  ////just for mock data
  const curFP = {...post};
  // delete curFP.position;
  // delete curFP.continent;
  curFP.username = 'Charlene';
  console.log('item:', curFP)
 /////
  const [open, setOpen] = React.useState(false);
  const [FP, setFP] = React.useState(curFP);

  const handleEdit = () => {
    setOpen(true);
    setFP(curFP)
  }
  const handleDelete = () => {
    delFP(post.id);
  }
  const handleClickClose = () => {
    setOpen(false);
  }
  const handleSelect = () => {
    //send to currentFP state
    selectFP(curFP);
  }
  return (
    <>
    <Box key = {post.title} spacing={0} className = {classes.box}>
    <Grid item >
    <Link href="/fp/[id]" as={`/fp/${post.title}`}>
      <CardActionArea
      component="a" onClick = {handleSelect}>
        <Card className={classes.card}>
        <Hidden xsDown>
            <CardMedia
              className={classes.cardMedia}
              image={post.urls[0]}
              title= "photo"
            />
          </Hidden>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {post.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {post.travelDate}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {post.des}
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
    <Grid item  className = {classes.icons}>
      <IconButton aria-label="edit" type= "button" onClick = {handleEdit} className={classes.margin}>
    <EditIcon />
    </IconButton>
  <IconButton aria-label="delete" value = {post.title} type = "button" onClick = {handleDelete} className={classes.margin}>
    <DelIcon />
    </IconButton>
    </Grid>
    </Box>
    <AddMdl state= {open} changeClose = {handleClickClose} editProps = {FP}></AddMdl>
    </>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectFP: fp => dispatch(selectFootPrint(fp)),
    delFP: id => dispatch(deleteFootPrint(id)),
  }
};

export default connect(state => state, mapDispatchToProps)(Item);