import React, {useContext, useEffect, useState} from 'react'
import {Routes, Route} from 'react-router-dom';
import {Outlet, Link} from 'react-router-dom';
import { Button, Text, Loader, Grid, Space, Container, GridCol, TextInput } from '@mantine/core';
import { useInputState } from '@mantine/hooks';

import Individual from '../Individual/Individual.js';

import { PokemonContext, TPokemonContext, TPokemonListItem } from "../../contexts/pokemon.context.jsx";
import PokemonList from '../../components/pokemon-list/pokemon-list.js';

export type TIndividualPokemon = {
    name: string,
    abilities: {
      ability: {name: string,
                url: string}
    }[]
    //count: number,
  }


//const Pokemon = ({pokemoninfo}:{pokemoninfo: undefined|string}) =>
const Pokemon = () => {
    const {pokemonList} = useContext(PokemonContext) as TPokemonContext;

    const [individualPokemon, setIndividualPokemon] = useState<undefined|TIndividualPokemon>(undefined);
    const [stringValue, setStringValue] = useInputState('');
    //const [filteredPokemonList, setFilteredPokemonList] = useState<TPokemonListItem>(pokemonList?);
    //const filteredPokemonList = useContext(PokemonContext) as TPokemonContext;
    const [filteredPokemonList, setFilteredPokemonList] = useState<undefined|TPokemonListItem[]>(pokemonList);

    const id = 3;

    useEffect(() =>{
    const fetchCall = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const pokemon = await response.json();
      console.log(pokemon);
      setIndividualPokemon(pokemon);
      console.log(pokemonList);
    }
    fetchCall();
  },[])


    

    useEffect(() => {
      const newFilteredPokemons = pokemonList.filter((pokemon) => {
        return pokemon.name.toLowerCase().includes(stringValue) && pokemon;
      });
      setFilteredPokemonList(newFilteredPokemons);
    }, [pokemonList, stringValue]
    );


    console.log(pokemonList, 'HERE IN /POKEMON');

    if(!individualPokemon) {
        return <Loader />;
    }
    //<Text>{individualPokemon?.abilities[0]?.ability.name}</Text>
    return (
      <>
        <Container size='lg'>
          <Container p='20'>
            <TextInput placeholder='Search Pokémon by name' value={stringValue} onChange={setStringValue} />
          </Container>
          {filteredPokemonList && <PokemonList {...filteredPokemonList}/>}
          <Grid>
            {pokemonList.map((pkmn) => (
              <GridCol key={pkmn.id} span={3} >
                <Button fullWidth variant='filled' color='red' component={Link} to={`${pkmn.id}`}>{pkmn.name.toUpperCase()}</Button>
              </GridCol>
            ))}
          
            <Text>{individualPokemon?.name}</Text>
            <Text>{individualPokemon?.abilities[0]?.ability.name}</Text>
          </Grid>
          </Container>
      </>
    )
}

export default Pokemon;
