import { BackgroundImage, Button, Grid, GridCol, Loader, Text } from '@mantine/core';
import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from "react-router-dom";

import { TPokemonListItem } from '../../contexts/pokemon.context';
import { Link } from 'react-router-dom';

import './pokemon-list.styles.scss';
import { TIndividualPokemon } from '../../pages/Pokemon/Pokemon';

type PokemonListProps = {
  filteredPokemonList: TPokemonListItem[];
};

type TPokemonNameAndImg = {
  name: string,
  sprites: {
    front_default: string,
    back_default: string,
  }
}

type TPokemonImageList = {
  pokemonImageList: TPokemonNameAndImg[],
}

const PokemonList: React.FC<PokemonListProps> = ({filteredPokemonList}) => {

  const [imageList, setImageList] = useState<TPokemonNameAndImg[]>([]);
  const [indPokemon, setIndPokemon] = useState<undefined|TPokemonNameAndImg>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  const addToImageHandler = (pokemonToAdd: TPokemonNameAndImg) => {
    setImageList(
      [
        ...imageList,
        pokemonToAdd
      ]
    )
  }

  

  const getPokemonImageUrl = (pokemonName: string): string => {
    const individualImageUrl =imageList.find(x => x.name == pokemonName)?.sprites.front_default;
    return individualImageUrl!;
  }
  const style = () => ({});
  const pokemonImageStyle = (imageUrl: string) => ({
  backgroundImage: `url(${imageUrl})`
});

  useMemo(()=>{
    const fetchCall = async () => {
      try{
        const newList: TPokemonNameAndImg[] = [];
        for (var i=1; i <= 151; i++) {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
          const pokemon: {name: string, sprites: {front_default: string, back_default: string}} = await response.json();
          newList.push(pokemon);
        }
        setImageList(newList);
      } finally{
          setLoading(false);
        }
    }
    setLoading(true);
    fetchCall();
  },[])
  
  const navigate = useNavigate();
  const navigateHandler = (url: number) => {
    navigate(url.toString());
  }

  if(!imageList) {
    return <Loader />;
  }

  return (
    <div>
      <Grid pt='50'>
        {filteredPokemonList.map((pkmn) => (
          <GridCol key={pkmn.id} span={3} onClick={() => navigateHandler(pkmn.id)} >
            <div className='BlackBorder BlueButton' style={pokemonImageStyle(getPokemonImageUrl(pkmn.name))}>
              {loading ? <Loader className='List-Loader'/> : (<Text fw={700} c='white' ta='center' tt='uppercase'>{pkmn.name}</Text>)}
            </div>
          </GridCol>
        ))}
      </Grid>
    </div>
  )
}

export default PokemonList;
