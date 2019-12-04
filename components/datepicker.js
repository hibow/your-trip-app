import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
export default function MaterialUIPickers({onSubmit, props}) {
  const [selectedDate, setSelectedDate] = React.useState(props);

  const handleDateChange = date => {
    setSelectedDate(date);
    onSubmit(date)
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
         <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Time picker"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
    </MuiPickersUtilsProvider>
  );
}