import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Fab from '@material-ui/core/Fab';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';


const useStyles = makeStyles(theme => ({
  arrowLeftIcon: {
    left: '0px',
    bottom:'200px'
  },
  carouselDiv: {
    cursor: 'pointer',
  },
  img: {
    verticalAlign: 'middle',
    height: '50vh'
  },
  arrowRightIcon: {
    position:'relative',
    float:'right',
    right: '0px',
    bottom:'200px',
  },
  delWrap: {
    position:'relative',
    float:'right',
    right: '0px',
    bottom:'-20px',
  },
  delIcon: {
    color:'red'
  }
}));

export default function Carousel({mode, urls, deleteUrls}) {
  const classes = useStyles();
  const [click, setClick] = React.useState(0);
  let maxLen = urls.length;

 const handleDelete = () => {
   let cloneUrls = [...urls];
   console.log('delete!', urls, click);
   cloneUrls.splice(click, 1);
   deleteUrls(cloneUrls)
 }
  const clickRight = () => {
    if (click < maxLen - 1) {
      setClick(click + 1);
    } else {
      console.log('no data')
    }
  }
  const clickLeft = () => {
    if (click > 0) {
      setClick(click - 1);
    } else {
      console.log('no data');
    }
  }
  return (
    <div className ={classes.carouselDiv} >
      {mode !== 'modal'? null:
    <Fab size = "small" aria-label="remove" className ={classes.delWrap} onClick = {handleDelete}>
    <RemoveCircleIcon aria-label="remove" className ={classes.delIcon} >  </RemoveCircleIcon>
    </Fab>}
    <CardMedia
      component="img" className ={classes.img}
          alt='photo'
          image= {urls[click]}
          />
    <Fab size = "small" color="primary" aria-label="arrow-left" className ={classes.arrowLeftIcon}>
    <ArrowLeftIcon onClick ={clickLeft}></ArrowLeftIcon>
    </Fab>
    <Fab size = "small" color="primary" aria-label="arrow-right" className ={classes.arrowRightIcon}>
  <ArrowRightIcon onClick ={clickRight}></ArrowRightIcon>
  </Fab>
</div>
  );
}