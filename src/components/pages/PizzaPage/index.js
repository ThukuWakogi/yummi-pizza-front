import React, { useEffect, useContext, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import PizzaCard from '../../layout/PizzaCard'
import { AuthContext } from '../../../contexts/AuthContext'
import { PizzasContext } from '../../../contexts/PizzasContext'
import ProgressComponent from '../../layout/ProgressComponent'

const PizzaPage = () => {
  const [state, setState] = useState({
    pizzas: null
  })
  const { initialUserLoad, authenticatedUser } = useContext(AuthContext)
  const { getPizzas } = useContext(PizzasContext)
  useEffect(() => {
    document.title = 'Yummi Pizza - Pizzas!'
    async function fetchPizzas() {
      setState({
        ...state,
        pizzas: await getPizzas()
      })
    }
    fetchPizzas()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  console.log(state)

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
              {
                state.pizzas
                  ? <Grid container direction="row" justify="center" spacing={2} alignItems="stretch">
                      {
                        state.pizzas.map(pizza => (
                          <Grid key={pizza.id} xs={12} sm={4} md={3} item>
                            <PizzaCard pizza={pizza}/>
                          </Grid>
                        ))
                      }
                    </Grid>
                  : <ProgressComponent message="getting pizzas" />
              }
            </>
          : <ProgressComponent />
      }
    </>

  )
}

export default PizzaPage
