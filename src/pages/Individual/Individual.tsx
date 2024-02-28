import React, { useContext, useEffect, useState } from 'react'
import { Button, Text, Loader } from '@mantine/core';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PokemonCard from '../../components/pokemon-card/pokemon-card.component';
import { PokemonContext, TPokemonContext, TPokemonNameAndImg } from '../../contexts/pokemon.context';
import axios from 'axios';

import './individual.styles.scss';
import pokedexPicture from '../../assets/pokedex_truepng_black.png';


export type TPkmn = {
  name: string,
  id: number,
  height: number,
  moves: {
    move: {
      name: string,
      url: string}
  }[],
  sprites: {
      front_default: string,
      back_default: string
  },
  types: {
    type: {
      name: string,
      url: string}
  }[]
}
  

const Individual = () => {

  const {id} = useParams();

  const [pkmn, setPkmn] = useState<undefined|TPkmn>(undefined);
  const [displayData, setDisplayData] = useState<string>('');
  const [movesArrayIndex, setMovesArrayIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
//const [searchString, setSearchString] = useState<undefined|string>('');


  const navigate = useNavigate();
  const navigateHandlerNext = (url: number) => {
    navigate('/pokemon/'+(url+1).toString());
  }
  const navigateHandlerPrevious = (url: number) => {
    if(url > 1){
      navigate('/pokemon/'+(url-1).toString());
    }
  }

  

  useEffect(
    () =>{
      setDisplayData('-');

      const fetchCall = async () => {
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
          const pokemon = await response.json();
          setDisplayData(pokemon.name);
          setMovesArrayIndex(0);
          setPkmn(pokemon);
        } finally {
          setLoading(false);
        }
      };
      setLoading(true);
      fetchCall();
    },[id])

  const movesArrayLoop = () => {
    
    movesArrayIndex < pkmn?.moves?.length!-1 ? setMovesArrayIndex(movesArrayIndex+1) : setMovesArrayIndex(0);
  }

  const displayDataHandler = (arg: string|number) => {
    movesArrayLoop();
    setDisplayData(arg.toString());
  }
  
  console.log(pkmn?.types[0].type.name);

  return (
    <div className='Pokedex-Body Main-Background'>
      <div className='Pokedex-Image-Container'>
        <>
            {loading ? (<Loader size='xl' className='Pokemon-Image-Loader'/>) : (pkmn && <PokemonCard {...pkmn} />)}
        </>
        <Text className='Pokemon-Data' tt='capitalize'>{displayData}</Text>
        <Button variant='outline' size='xs' c='white' className='Button-Blue-1-2' onClick={() => displayDataHandler('Height: '+pkmn?.height!+'dm')}>&#8593;</Button>
        <Button variant='outline' size='xs' c='white' className='Button-Blue-1-1' onClick={() => displayDataHandler((movesArrayIndex+1)+':'+pkmn?.moves[movesArrayIndex]?.move?.name!)}>!</Button>
        <Button variant='subtle' size='xs' className='Button-Previous' onClick={() => navigateHandlerPrevious(pkmn?.id!)}>{`<`}</Button>
        <Button variant='subtle' size='xs' className='Button-Next'onClick={() => navigateHandlerNext(pkmn?.id!)}>{`>`}</Button>
        <img src={pokedexPicture} alt="pokedex" className="pokedex" />
        <div>
          <Button variant='filled' color="rgba(42, 117, 187, 1)" component={Link} to='/pokemon'>All Pokemon</Button>
        </div>
      </div>
      
    </div>
  )
}

export default Individual
