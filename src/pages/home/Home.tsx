import { Button, Text, Center } from '@mantine/core';
import {useViewportSize} from '@mantine/hooks';
import React, { useEffect, useState } from 'react';
import {Outlet, Link} from 'react-router-dom';

import Pokemon from '../Pokemon/Pokemon';

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

  function useViewportSize(): {
    height: number;
    width: number;
  };

  const {height, width} = useViewportSize();

  return (
    <Center maw={width} h={height}>
      <Button component={Link} to='/pokemon'>To All Pokemon</Button>
    </Center>
  )
}

export default Home;