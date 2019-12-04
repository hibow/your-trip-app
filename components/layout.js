import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  layoutStyle: {
    margin: 20,
    padding: 40,
    [theme.breakpoints.between('xs','sm')]: {
      margin: 2,
      padding: 4,
      paddingTop:40
    },
  }
}))

export default function Layout(props) {
  const classes = useStyles();
  return (
    <div className={classes.layoutStyle}>
      {props.children}
    </div>
  )
}
