import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

export default function SnackbarFunc({vertical, horizontal, open, text, closeSnack}) {
  const handleClose = () => {
    closeSnack();
  };
  return (
    <Snackbar
    anchorOrigin={{ vertical , horizontal }}
    key={`${vertical},${horizontal}`}
    open={open}
    onClose={handleClose}
    ContentProps={{
      'aria-describedby': 'message-id',
    }}
    message={<span id="message-id">{text}</span>}
  />
  );
}