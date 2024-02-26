import React, {useContext, useEffect, useState} from 'react'
import {Routes, Route} from 'react-router-dom';
import {Outlet, Link} from 'react-router-dom';
import { Button, Text, Loader, Grid, Space, Container, GridCol, TextInput } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import classes from './Pokemon.module.css';

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
    const {filteredPokemonList, setFilteredPokemonList} = useContext(PokemonContext) as TPokemonContext;

    
    const [stringValue, setStringValue] = useInputState('');
    //const [filteredPokemonList, setFilteredPokemonList] = useState<undefined|TPokemonListItem[]>(pokemonList);


    


  // setFilteredPokemonList(pokemon.results.map((pokemon, i) => ({name: pokemon.name, id: i+1})));

    useEffect(() => {
      const newFilteredPokemons = pokemonList.filter((pokemon) => {
        return pokemon.name.toLowerCase().includes(stringValue) && pokemon;
      });
      setFilteredPokemonList(newFilteredPokemons);
    }, [pokemonList, stringValue]
    );

    
    //<Text>{individualPokemon?.abilities[0]?.ability.name}</Text>
    return (
      <div className='Main-Background'>
        <Container size='lg' bg='red' className='Dex-Container '>
          <Container p='1em' pb='1em' className='Search-Background BlackBorder'>
            <TextInput classNames={{ input: classes.textInput }} placeholder='Search Pokémon by name' value={stringValue} onChange={setStringValue} />
          </Container>
          <Container>
            {filteredPokemonList && <PokemonList filteredPokemonList={filteredPokemonList}/>}
          </Container>
            
          </Container>
      </div>
    )
}

export default Pokemon;
