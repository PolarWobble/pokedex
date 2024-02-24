import React from 'react';
import { Button, Text, Center } from '@mantine/core';

import { TPkmn } from '../../pages/Individual/Individual';
import { Link } from 'react-router-dom';


const PokemonCard = (pkmn: TPkmn) => {
  return (
    <div>
      <Text>BAKADBAS</Text>
      <Text>{pkmn.name} is in pokemon-card</Text>
      <Button component={Link} to='/'>Back to Home</Button>
    </div>
  )
}

export default PokemonCard;
