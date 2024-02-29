import { BackgroundImage, Button, Grid, GridCol, Loader, Text } from '@mantine/core';
import React, { useEffect, useState, useMemo, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import {useInView} from 'react-intersection-observer';
import axios from 'axios';

import { PokemonContext, TPokemonContext, TPokemonListItem, TPokemonNameAndImg } from '../../contexts/pokemon.context';
import { Link } from 'react-router-dom';

import './pokemon-list.styles.scss';

type PokemonListProps = {
  filteredPokemonList: TPokemonNameAndImg[];
};


const PokemonList: React.FC<PokemonListProps> = ({filteredPokemonList}) => {
  const {pokemonList} = useContext(PokemonContext) as TPokemonContext;
  const [loading, setLoading] = useState<boolean>(true);


  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const style = () => ({});
  const pokemonImageStyle = (imageUrl: string) => ({
    backgroundImage: `url(${imageUrl})`
  });


  //? Sequential #2
/*   useMemo(async () => {
    const loadPokemonSequentially = async () => {
      setLoading(true);
      const sequentialRequest:TPokemonNameAndImg[] = [];

      try{
        for (var i=1; i <= 493; i++) {
          sequentialRequest.push(
          await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`).then((response) => response.data));
          
          setImageList(sequentialRequest);
          console.log(sequentialRequest);  
        }
      } catch(error) {
        console.log('Error while fetching: ', error);
      } finally {
        setLoading(false);
      }
    }

  loadPokemonSequentially();
  },[])  */




  //? Sequential requests
/*   useMemo(async () => {
    const newList: TPokemonNameAndImg[] = [];
    setLoading(true);
    try{
      for (var i=1; i <= 493; i++) {
        await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`).then((response) => {
          const pokemon: {name: string, sprites: {front_default: string, back_default: string}} = response.data;
          newList.push(pokemon);
          addToImageHandler(pokemon);
          console.log(newList);
        })
      }
    } finally{
      setLoading(false);
    }
    
    setImageList(newList);
    
  },[]) */

  //?Concurrent requests

  /* useMemo(async () => {
    setLoading(true);
    const newList: TPokemonNameAndImg[] = [];

    try {
      for (var i=1; i <= 50; i++) {
        await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`).then((response) => {
          const pokemon: {name: string, sprites: {front_default: string, back_default: string}} = response.data;
          newList.push(pokemon);
          
          //addToImageHandler(pokemon);
          console.log(newList);
        })
      }
      setImageList(newList);
      

      const secondRequests = Array.from({length: (493-50)}, (_, i) => 
        axios.get(`https://pokeapi.co/api/v2/pokemon/${i+51}`).then((response) => {
          return response.data;
        }));

      const secondResponses: TPokemonNameAndImg[] = await Promise.all(secondRequests);

      addArrayToImageList(secondResponses);
      console.log(imageList);

    } catch (error){
      console.log('Error fetching Pokemon data:', error);
    } finally{
      setLoading(false);
    }
  },[]) */






  /* useEffect(() => {
    if (inView){
      filteredPokemonList.forEach((pkmn) => {
        lazyLoadImage(pkmn);
      })
    }
  }) */
  
  const navigate = useNavigate();
  const navigateHandler = (url: number) => {
    navigate(url.toString());
  }

  //console.log(imageList);


  return (
    <div>
      <Grid pt='50'>
        {filteredPokemonList.map((pkmn) => (
          <GridCol key={pkmn.id} span={3} onClick={() => navigateHandler(pkmn.id)} >
            {
              pkmn ? (
              <div className='BlackBorder BlueButton' style={pokemonImageStyle(pkmn.sprites.front_default)}> 
                <Text fw={700} c='white' ta='center' tt='uppercase'>{pkmn.name}</Text>
              </div>
              ) : (
                <Loader className='BlueButton List-Loader'/> 
              )
            }
          </GridCol>
        ))}
      </Grid>
    </div>
  )
}

export default PokemonList;
