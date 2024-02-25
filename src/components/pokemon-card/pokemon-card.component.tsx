import React from 'react';
import { Button, Text, Center } from '@mantine/core';

import { TPkmn } from '../../pages/Individual/Individual';
import { Link } from 'react-router-dom';


const PokemonCard = (pkmn: TPkmn) => {
  return (
      <img src={`${pkmn?.sprites?.front_default}`} className='Pokemon-Image'/>
  )
}

export default PokemonCard;
