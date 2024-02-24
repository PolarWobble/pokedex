import { Button, Grid, GridCol, Text } from '@mantine/core';
import React from 'react'

import { TPokemonListItem } from '../../contexts/pokemon.context';
import { Link } from 'react-router-dom';

const PokemonList = (filteredPokemonList: TPokemonListItem[]) => {
    console.log(filteredPokemonList);

  return (
    <div>
        <button>hejsan</button>
      
    </div>
  )
}

/*  <Grid>
        {filteredPokemonList.map((pkmn) => (
            <GridCol key={pkmn.id} span={3} >
            <Button fullWidth variant='filled' color='red' component={Link} to={`${pkmn.id}`}>{pkmn.name.toUpperCase()}</Button>
            </GridCol>
        ))}
    </Grid> */

export default PokemonList;
