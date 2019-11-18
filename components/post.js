import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import Datepicker from './datepicker';
import { makeStyles } from '@material-ui/core/styles';
import {DropzoneArea} from 'material-ui-dropzone';
import {readPostAction} from '../action/modalAction';
import data from '../db/data';
import firebase from '../firebase/index'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection:'row'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const Post= (props) => {
  const classes = useStyles();
  // const {readPostState, readPost} = props;
  const {state, changeClose} = props;
  // const [open, setOpen] = React.useState(state);
  // console.log('am I here?', readPostState)
  console.log('i am here, ', state)
  const handleClose = () => {
    // setOpen(false);
    console.log('close', state)
    changeClose();
    // readPost(false)
  }
  const getImgTest = () => {
    // Get a reference to the storage service, which is used to create references in your storage bucket
  var storage = firebase.storage();

// Create a storage reference from our storage service
  var storageRef = storage.ref();
  storageRef.child('towerbridge.png').getDownloadURL().then(function(url) {
    // `url` is the download URL for 'images/stars.jpg'

    // This can be downloaded directly:
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function(event) {
      var blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();

    // Or inserted into an <img> element:
    var img = document.getElementById('myimg');
    img.src = url;
    console.log(url)
  }).catch(function(error) {
    // Handle any errors
    console.log(error)
  });
  }

  return (
    <Dialog open={state} onClose={handleClose} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">footprint test</DialogTitle>
    <DialogContent>
    <img id='myimg' src=''></img>
      <DialogContentText>
      TEst  test
      {getImgTest()}

      </DialogContentText>
      </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
  );
};
// const mapDispatchToProps = (dispatch) => {
//   return {
//     readPost: (open, id) => dispatch(readPostAction(open, id))
//   }
// };


// export default connect(state => state, mapDispatchToProps)(Post);
// export default Post