import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import Link from 'next/link';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Carousel from '../../../components/carousel';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
  textDiv: {
    textAlign: 'center'
  },
  table: {
    marginTop: '40px',
    padding: '20px',
    width:'80%',
    margin: 'auto'
  },
  box: {
    marginTop: '40px',
    padding: '20px',
    border: '1px solid gray',
    width:'80%',
    margin: 'auto'
  }
}));

const FPPost= (props) =>{

  const router = useRouter();
  const classes = useStyles();
  const {currentFP} = props;
  console.log(currentFP.urls[0])
  ///static image -> needs to change from firestore
  //bug to fix: format
  ///
  return (
      <Container maxWidth="md">
      <Paper className={classes.root}>
      <Link href="/home">
        <button>Back</button>
      </Link>
      <Typography variant="h3" component="div" className = {classes.textDiv}>
      {router.query.id}
      </Typography>
      <Table className={classes.table}>
        <TableBody>
        <TableRow>
          <TableCell component="th" scope="row" colSpan={2}>
          Travel Date:
          </TableCell>
          <TableCell colSpan={2}>
            {currentFP.travelDate}
          </TableCell>
        </TableRow>
        <TableRow>
        <TableCell component="th" scope="row" colSpan={2}>
          Location:
          </TableCell>
          <TableCell colSpan={2}>
          {currentFP.city},{ currentFP.country}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell component="th" scope="row" colSpan={2}>
            Description:
          </TableCell >
          <TableCell colSpan={2}>
          {currentFP.des}
          </TableCell>
        </TableRow>
        </TableBody>
      </Table>
      <Box className = {classes.box}>
      <Carousel mode={'post'} urls = {currentFP.urls[0]}></Carousel>
      </Box>
    </Paper>
      </Container>
  );
}

export default connect(state => state, null)(FPPost);