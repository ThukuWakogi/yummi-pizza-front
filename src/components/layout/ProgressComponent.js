import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(theme => ({
  progressDiv: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  progressPlacement: {
    transform: 'translate(0px, -100px)',
    textAlign: 'center'
  },
  h4: {
    marginTop: theme.spacing(2)
  }
}))

const ProgressComponent = ({ message }) => {
  const classes = useStyles()

  return (
    <div className={classes.progressDiv}>
      <div className={classes.progressPlacement}>
        <CircularProgress size={54}/>
        <Typography variant="h4" className={classes.h4}>{message ? message : 'loading'}...</Typography>
      </div>
    </div>
  );
}
 
export default ProgressComponent;
