import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Datepicker from './datepicker';
import { makeStyles } from '@material-ui/core/styles';
import {DropzoneArea} from 'material-ui-dropzone';
import {addFootPrints, editFootPrint, uploadFiles} from '../action/FPAction';
import Carousel from './carousel';



const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection:'row',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  Modal: {
    maxWidth:'200vw',
  }
}));

const FormDialog = (props) => {

  const classes = useStyles();
  const {state, changeClose, addFP, currentFP, editProps, editFP, user, uploadFILES, imgrUrl, uploadErr} = props;
  ///default add modal- move to store.js
  let defaultProps = editProps;
  if (!defaultProps) {
    defaultProps = {
      id: '',
      uid:user.uid,
      username: user.displayName,
      travelDate: new Date().toString(),
      title:'',
      city: '',
      country:'',
      des:'',
      urls:[]
    };
  }
  ///
  const [travelDate, setDate] = React.useState(defaultProps.travelDate);
  const [country, setCountry] = React.useState(defaultProps.country);
  const [city, setCity] = React.useState(defaultProps.city);
  const [title, setTitle] = React.useState(defaultProps.title);
  const [des, setDes] = React.useState(defaultProps.des);
  const [urls, setUrls] = React.useState(defaultProps.urls);
  const [files, setFiles] = React.useState([]);

  const handleClose = () => {
    //need reset all status before close
    console.log(editProps)
    changeClose();
  };

  const handleSubmit = async evt => {
    evt.preventDefault();
    let id = defaultProps.id;
    let fp = {...{files: files, uid: user.uid, username: user.displayName},...{id, title, travelDate, urls, des, country, city}};

    if (editProps) {
        await editFP(fp, files);
    } else {
      await addFP(fp); //toDO
    }
    // await uploadFILES(files);
    await console.log(imgrUrl, uploadErr)
    //upload files
    //clear files state
    await changeClose();
  }
  const handleSubmitDate = date => {
    //date from datepicker is always a timestamp object
    let dateStr = date.toString()
    setDate(dateStr);
  }
  const changeTitle = evt => {
    setTitle(evt.target.value)
  }
  const changeCtry = evt => {
    setCountry(evt.target.value)
  }
  const changeCity = evt => {
    setCity(evt.target.value)
  }
  const changeUrls = (curUrls) => {
    // setUrls([evt.target.value])
    console.log(curUrls)
    setUrls(curUrls);
  }
  const changeDes = evt => {
    setDes(evt.target.value)
  }

  const dropFiles = async files =>{
    await setFiles(files)
    await console.log(files) //array

    //call upload function in submit
  }
  return (
    <>
      <Dialog  className={classes.Modal} open={state} onClose={handleClose} aria-labelledby="form-dialog-title">
      {!editProps?
        <DialogTitle id="form-dialog-title">Add footprint</DialogTitle>
        : <DialogTitle id="form-dialog-title">Edit footprint</DialogTitle>}
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          <Datepicker onSubmit = {handleSubmitDate} props = {travelDate}> </Datepicker>
          <TextField
          id="title"
          label="Title"
          value = {title}
          onChange = {changeTitle}
          style={{ margin: 8 }}
          placeholder="Tower Bridge"
          fullWidth
          margin="normal"
        />
          <div className = {classes.container}>
          <TextField
          label="Country"
          id="country"
          placeholder="UK"
          value = {country}
          onChange = {changeCtry}
          className={classes.textField}
          margin="dense"
        />
          <TextField
          label="City"
          id="city"
          placeholder = "London"
          value = {city}
          onChange = {changeCity}
          className={classes.textField}
          margin="dense"
        />
{/* image display area : delete urls field*/}
          </div>
          <div>
          <TextField
          label="photo url"
          id="url"
          placeholder="url"
          value = {urls}
          onChange = {changeUrls}
          className={classes.textField}
          margin="dense"
          />
        </div>
        { !editProps?
        null:<Carousel mode = {'modal'} urls = {urls} deleteUrls= {changeUrls}></Carousel>}
          <TextField
            margin="dense"
            id="description"
            label="Description"
            placeholder="This place is amazing!"
            value = {des}
            onChange = {changeDes}
            fullWidth
          />
        <DropzoneArea  onChange={dropFiles}></DropzoneArea>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    editFP: (fp, files) => dispatch(editFootPrint(fp, files)),
    addFP: fp => dispatch(addFootPrints(fp)),
    uploadFILES: (files) => dispatch(uploadFiles(files))
  }
};

export default connect(state => state, mapDispatchToProps)(FormDialog);
