import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
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
import SnackbarFunc from './snackbar';


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
    [theme.breakpoints.between('xs','sm')]: {
      width: '30vw',
    },
  },
  h5: {
    [theme.breakpoints.between('xs','sm')]: {
      fontSize: '1.1rem'
    },
  },
  subtitle1: {
    [theme.breakpoints.between('xs','sm')]: {
      fontSize: '1rem'
    },
  },
  button: {
    margin: theme.spacing(1),
  },
  box: {
    paddingTop: '20px',
    overflow: 'auto',
    [theme.breakpoints.between('xs','sm')]: {
      height: '20vh'
    },
  },
  icons: {
    display: 'flex',
    flexDirection: 'row'
  }
}));


const Item = (props) => {
  const classes = useStyles();
  const {selectFP, post, delFP, user} = props;
  const curFP = {...post};

  const [open, setOpen] = React.useState(false);
  const [FP, setFP] = React.useState(curFP);

 ///snack bar
 const snackState = {
  open: false,
  msg: 'none',
  vertical: 'bottom',
  horizontal: 'center'
}

  const [snackCurrent, setSnack] = React.useState(snackState);
  const snackFunc = (newMsg) => {
  let tempSnack = {...snackCurrent, open: true, msg:newMsg};
    setSnack(tempSnack);
  }
  const closeSnack = () => {
    setSnack(snackState)
  }
////

  const handleEdit = () => {
    if (!curFP.uid || curFP.uid !== user.uid) {
      console.log('you can not edit!');
    } else {
      setOpen(true);
      setFP(curFP)
    }
  }
  const handleDelete = () => {
    if (!curFP.uid || curFP.uid !== user.uid) {
      console.log('you can not delete!');
    } else {
      delFP(post.id);
      snackFunc('data is deleted!')
    }
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
    <Box key = {post.id} spacing={0} className = {classes.box} >
    <Grid item >
    <Link href="/fp/[id]" as={`/fp/${post.id}`}>
      <CardActionArea
      component="a"
      onClick = {handleSelect}
      >
        <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={post.urls[0]}
              title= "photo"
            />
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography variant="h5" className={classes.h5}>
                {post.title}
              </Typography>
            <Hidden xsDown>
              <Typography variant="subtitle1" className={classes.subtitle1} color="textSecondary">
                {post.travelDate}
              </Typography>
              <Typography variant="subtitle1" className={classes.subtitle1} paragraph>
                {post.des}
              </Typography>
              <Typography variant="subtitle1" className={classes.subtitle1} color="primary">
                Continue reading...
              </Typography>
              </Hidden>
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
    <SnackbarFunc text={snackCurrent.msg} open={snackCurrent.open}
      vertical={snackCurrent.vertical} horizontal={snackCurrent.horizontal}
      closeSnack={closeSnack}></SnackbarFunc>
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