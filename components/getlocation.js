import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';
// import parse from 'autosuggest-highlight/parse';
// import throttle from 'lodash/throttle.js';
import env from '../config';

function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

const useStyles = makeStyles(theme => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

export default function GoogleMaps() {
  const classes = useStyles();
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const loaded = React.useRef(false);
  console.log('now is:',loaded);
  console.log('options:', options);
  const key = env.GOOGLE_API_KEY;

  // if (typeof window !== 'undefined') {
  //   if (!document.querySelector('#google-maps')) {
  //     loadScript(
  //       `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`,
  //       document.querySelector('head'),
  //       'google-maps',
  //     );
  //     loaded.current = true;
  //   }

    console.log('windows:',window.google);
    if (window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
      console.log(autocompleteService.current)
    }
  const handleChange = event => {
    console.log('change:',event);
    setInputValue(event.target.value);
  };

  const fetch = React.useMemo(
    () =>
      throttle((input, callback) => {
        autocompleteService.current.getPlacePredictions(input, callback);
      }, 200),
    [],
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      return undefined;
    }

    fetch({ input: inputValue }, results => {
      if (active) {
        setOptions(results || []);
      }
    });

    return () => {
      active = false;
    };
  }, [inputValue, fetch]);

  return (
    <Autocomplete
      style={{ width: 300 }}
      getOptionLabel={option => option.description}
      filterOptions={x => x}
      options={options}
      autoComplete
      includeInputInList
      freeSolo
      disableOpenOnFocus
      renderInput={params => (
        <TextField
          {...params}
          InputLabelProps={{ shrink: true }}
          value = {inputValue}
          label="Add a location"
          variant="outlined"
          fullWidth
          onChange={handleChange}
        />
      )}
      renderOption={option => {
        if (!option) {
          option = 'Houston'
        }
        console.log('option', option);
        const matches = option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map(match => [match.offset, match.offset + match.length]),
        );

        return (
          <Grid container alignItems="center">
            <Grid item>
              <LocationOnIcon className={classes.icon} />
            </Grid>
            <Grid item xs>
              {parts.map((part, index) => (
                <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                  {part.text}
                </span>
              ))}

              <Typography variant="body2" color="textSecondary">
                {option.structured_formatting.secondary_text}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
}