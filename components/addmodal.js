//nav button
//same style excep user account icon
//HOC?  https://reactjs.org/docs/higher-order-components.html
import React from 'react';
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
export default function FormDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
     <AddIcon type = "button" onClick={handleClickOpen}>
      </AddIcon>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add footprint</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          <Datepicker></Datepicker>
          <TextField
          id="place"
          label="Place Name"
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
          className={classes.textField}
          margin="dense"
        />
          <TextField
          label="City"
          id="city"
          placeholder = "London"
          className={classes.textField}
          margin="dense"
        />

          </div>
          <TextField
          label="photo url"
          id="url"
          placeholder="url"
          className={classes.textField}
          margin="dense"
        />
          <TextField
            margin="dense"
            id="des"
            label="Description"
            placeholder="This place is amazing!"
            fullWidth
          />
        <DropzoneArea></DropzoneArea>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
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

