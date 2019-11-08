//change position to the top
import Typography from '@material-ui/core/Typography';

export default function Greeting (){

  return (
    <div style={{paddingTop: '20px', display:'flex', direction:'row'}}>
      <Typography variant="h4">
      Hello Charlene, drop some footprints?
      </Typography>
    </div>
  );
}