import React, { useEffect, useState } from 'react'
import { Button, Text, Loader } from '@mantine/core';
import { useParams } from 'react-router-dom';
import PokemonCard from '../../components/pokemon-card/pokemon-card.component';

export type TPkmn = {
    name: string,
    id: number,
    height: number,
    abilities: {
      ability: {name: string,
                url: string}
    }[],
    sprites: {
        front_default: string,
        back_default: string
    }
  }
  
 /*
  export type TPkmn = {
    name: string;
    id: number;
    height: number;
    abilities: {
      ability: {
        name: string;
        url: string;
      };
    }[];
    sprites: {
      front_default: string;
      back_default: string;
    };
  };*/


const Individual = () => {

    const {id} = useParams();

    const [pkmn, setPkmn] = useState<undefined|TPkmn>(undefined);
  //const [searchString, setSearchString] = useState<undefined|string>('');


    useEffect(
     () =>{
    const fetchCall = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
      const pokemon = await response.json();
      console.log(pokemon);
      setPkmn(pokemon);
    }
    fetchCall();
  },[])


    return (
        <div>
            <Text>INDIVIDUAL</Text>
            {pkmn && <PokemonCard {...pkmn} />}
            <Text>Pokemon page for id: {pkmn?.id}, with the name: {pkmn?.name}</Text>
            <img src={`${pkmn?.sprites?.front_default}`} />
            <img src={`${pkmn?.sprites?.back_default}`} />
        </div>
    )
}

export default Individual
