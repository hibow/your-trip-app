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
import {addFootPrints, editFootPrint} from '../action/FPAction';



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

const FormDialog = (props) => {

  const classes = useStyles();
  const {state, changeClose, addFP, currentFP, editProps, editFP, user} = props;
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


  const handleClose = () => {
    changeClose();
  };

  const handleSubmit =() => {
    let id = editProps.id;
    let fp = {...{uid: user.uid, username: user.displayName},...{id, title, travelDate, urls, des, country, city}};

    if (editProps) {
     editFP(fp);
    } else {
      addFP(fp);
    }
    changeClose();
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
  const changeUrls = evt => {
    setUrls([evt.target.value])
  }
  const changeDes = evt => {
    setDes(evt.target.value)
  }
  return (
    <>
      <Dialog open={state} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add footprint</DialogTitle>
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

          </div>
          <TextField
          label="photo url"
          id="url"
          placeholder="url"
          value = {urls}
          onChange = {changeUrls}
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
        <DropzoneArea></DropzoneArea>
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
    editFP: fp => dispatch(editFootPrint(fp)),
    addFP: fp => dispatch(addFootPrints(fp)),
  }
};

export default connect(state => state, mapDispatchToProps)(FormDialog);
