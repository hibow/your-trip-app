import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Charlene Liu
      </Link>{' | MyFootPrint '}
      { ' '+ new Date().getFullYear()}
      {'. Built with '}
      <Link color="inherit" href="#">
        Love
      </Link>
    </Typography>
  );
}


export default function Footer() {
  return (
    <Box mt={5}>
    <Copyright />
  </Box>
  )
}
