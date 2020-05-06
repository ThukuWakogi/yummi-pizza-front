import React, { useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import PizzaCard from '../../layout/PizzaCard'
import { AuthContext } from '../../../contexts/AuthContext'

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
  }
}))

const PizzaPage = () => {
  const classes = useStyles()
  const { initialUserLoad, authenticatedUser } = useContext(AuthContext)
  useEffect(() => {
    document.title = 'Yummi Pizza - Pizzas!'
  })

  return (
    <>
      {
        initialUserLoad
          ? <>
              {
                authenticatedUser
                  ? <Typography variant="body1">{authenticatedUser.name}</Typography>
                  : null
              }
              <Grid container justify="center" spacing={2}>
                {
                  [0, 1, 2, 3, 4, 5, 6, 7].map(value => (
                    <Grid key={value} xs={6} sm={4} md={3} item>
                      <PizzaCard />
                    </Grid>
                  ))
                }
              </Grid>
            </>
          : <div className={classes.progressDiv}>
              <div className={classes.progressPlacement}>
                <CircularProgress />
                <Typography variant="body1">loading...</Typography>
              </div>
            </div>
      }
    </>
    
  )
}
 
export default PizzaPage
