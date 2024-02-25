import { Button, Text, Center } from '@mantine/core';
import {useViewportSize} from '@mantine/hooks';
import React, { useEffect, useState } from 'react';
import {Outlet, Link} from 'react-router-dom';

import Pokemon from '../Pokemon/Pokemon';
import './Home.styles.scss';

export type TPkmn = {
  name: string,
  abilities: {
    ability: {name: string,
              url: string}
  }[]
}





const Home = () => {
  const [pkmn, setPkmn] = useState<undefined|TPkmn>(undefined);
  //const [searchString, setSearchString] = useState<undefined|string>('');
  

  const id = 3;


  useEffect(
     () =>{
    const fetchCall = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const pokemon = await response.json();
      console.log(pokemon);
      setPkmn(pokemon);
    }
    fetchCall();
  },[])


  return (
    <div className='Main-Background Home-Background'>
      <Button size="xl" color="rgba(42, 117, 187, 1)" component={Link} to='/pokemon'>To All Pokemon</Button>
    </div>
  )
}

export default Home;