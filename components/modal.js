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
import data from '../db/data';


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
  const {state, changeClose} = props;
  // const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(data[0].time);
  const [country, setCountry] = React.useState(data[0].country);
  const [city, setCity] = React.useState(data[0].city);
  const [place, setPlace] = React.useState(data[0].title);
  const [des, setDes] = React.useState(data[0].summary);
  const [url, setUrl] = React.useState(data[0].photos[0]);
  const {newFootPrint, editFootPrint, addFootPrints} = props;
  const handleClose = () => {
    console.log('close', state)
    changeClose();
  };
  const handleSubmit =() => {
    let fp = {...newFootPrint,...{place, date, url, des, country, city}};
    editFootPrint(fp);
    addFootPrints(fp);
    // setOpen(false);
    changeClose();
  }
  const handleSubmitDate = date => {
    setDate(date);
  }
  const changePlace = evt => {
    setPlace(evt.target.value)
  }
  const changeCtry = evt => {
    setCountry(evt.target.value)
  }
  const changeCity = evt => {
    setCity(evt.target.value)
  }
  const changeUrl = evt => {
    setUrl(evt.target.value)
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
          <Datepicker onSubmit = {handleSubmitDate} props = {data[0].time}> </Datepicker>
          <TextField
          id="place"
          label="Place Name"
          value = {place}
          onChange = {changePlace}
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
          value = {url}
          onChange = {changeUrl}
          className={classes.textField}
          margin="dense"
        />
          <TextField
            margin="dense"
            id="des"
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

// ActBtn.propTypes = {
//   style: PropTypes.object.isRequired,
//   className: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   text: PropTypes.string.isRequired,
// };
const mapDispatchToProps = (dispatch) => {
  return {
    editFootPrint: fp => dispatch(editFootPrint(fp)),
    addFootPrints: fp => dispatch(addFootPrints(fp))
  }
};

export default connect(state => state, mapDispatchToProps)(FormDialog);
