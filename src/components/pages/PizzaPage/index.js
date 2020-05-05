import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import PizzaCard from '../../layout/PizzaCard';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const PizzaPage = () => {
  const classes = useStyles();

  return (
    <Grid container justify="center" spacing={2}>
      {
        [0, 1, 2, 3, 4, 5, 6, 7].map(value => (
          <Grid key={value} xs={6} sm={4} md={3} item>
            <PizzaCard />
          </Grid>
        ))
      }
    </Grid>
  )
}
 
export default PizzaPage
