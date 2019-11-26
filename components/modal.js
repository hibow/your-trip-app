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
import {changeFootPrint, deleteFiles} from '../action/FPAction';
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

const convertDate = (inputFormat) => {
  const pad = (s) => { return (s < 10) ? '0' + s : s; }
  let d = new Date(inputFormat)
  return [d.getFullYear(), pad(d.getMonth()+1), pad(d.getDate())].join('/')
}

const FormDialog = (props) => {

  const classes = useStyles();
  const {state, changeClose, editProps, changeFP, user,imgrUrl, uploadErr} = props;
  ///default add modal- move to store.js
  let defaultProps = editProps;
  if (!defaultProps) {
    defaultProps = {
      id: '',
      uid:user.uid,
      username: user.displayName,
      travelDate: convertDate(new Date()),
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
  const [toBeDeleted, setDelete] = React.useState([]);

  // console.log('tobedeleted:', typeof toBeDeleted, toBeDeleted)
  const resetFields = () => {
    setDate(defaultProps.travelDate);
    setCountry(defaultProps.country);
    setCity(defaultProps.city);
    setTitle(defaultProps.setTitle);
    setDes(defaultProps.des);
    setUrls(defaultProps.urls);
    setFiles([]);
    setDelete([]);
  }
  const handleClose = () => {
    //need reset all status before close
    resetFields();
    changeClose();
  };

  const handleSubmit = async evt => {
    evt.preventDefault();
    let id = defaultProps.id;
    if (editProps) {
      let fp = {...{uid: user.uid, username: user.displayName},...{id, title, travelDate, urls, des, country, city}};
      await deleteFiles(toBeDeleted);
      await changeFP('edit', fp, files);
    } else {
      let fp = {...{uid: user.uid, username: user.displayName},...{title, travelDate, urls, des, country, city}};
      await changeFP('add', fp, files);
    }
    await resetFields();
    await changeClose();
  }


  const handleSubmitDate = date => {
    //date from datepicker is always a timestamp object
    let dateStr = convertDate(date);
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
  const changeUrls = (curUrls, tobedeletedurl) => {
    setUrls(curUrls);
    let deleteArr = [...toBeDeleted];
    deleteArr.push(tobedeletedurl);
    setDelete(deleteArr);
  }
  const changeDes = evt => {
    setDes(evt.target.value)
  }

  const dropFiles = async files =>{
    await setFiles(files)
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
          label="Place Name"
          value = {title}
          onChange = {changeTitle}
          placeholder="Tower Bridge"
          fullWidth
          margin="dense"
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
          <TextField
            margin="dense"
            id="description"
            label="Description"
            placeholder="This place is amazing!"
            value = {des}
            onChange = {changeDes}
            fullWidth
          />
{/* image display area : delete urls field*/}
          </div>
          {/* <div>
          <TextField
          label="photo url"
          id="url"
          placeholder="url"
          value = {urls}
          onChange = {changeUrls}
          className={classes.textField}
          margin="dense"
          />
        </div> */}
        { !editProps?
        null:<Carousel mode = {'modal'} urls = {urls} deleteUrls= {changeUrls}></Carousel>}

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
    changeFP: (mode, fp, files) => dispatch(changeFootPrint(mode, fp, files)),
  }
};

export default connect(state => state, mapDispatchToProps)(FormDialog);
