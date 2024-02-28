import axios from "axios";
import React, { useState, createContext, useEffect, useMemo } from "react";

export type TPokemonContext = {
    pokemonList: TPokemonNameAndImg[];
    setPokemonList: (pokemonList: TPokemonNameAndImg[]) => void;
    filteredPokemonList: TPokemonNameAndImg[];
    setFilteredPokemonList: (pokemonList: TPokemonNameAndImg[]) => void;

}

export type TPokemonListItem = {
    name: string,
    id: number
}

export type TPokemonNameAndImg = {
  name: string,
  id: number,
  height: number,
  moves: {
    move: {name: string,
              url: string}
  }[]
  sprites: {
    front_default: string,
    back_default: string,
  }
}

export const PokemonContext = createContext<TPokemonContext | null>(null);

type TPokemonProvider = {
    children: React.ReactNode,    
}

export const PokemonProvider = ({children}:TPokemonProvider) => {
    const [pokemonList, setPokemonList] = useState<TPokemonNameAndImg[]>([]);
    const [filteredPokemonList, setFilteredPokemonList] = useState<TPokemonNameAndImg[]>([]);

    const addPokemonArrayToPokemonList = (arrayToAdd: TPokemonNameAndImg[]) => {
      setPokemonList((prevPokemonList) =>
        [
          ...prevPokemonList,
          ...arrayToAdd.map((e) => e)
        ]
      )
    }

    useMemo(async () => {
      const newList: TPokemonNameAndImg[] = [];
  
      try {
        const firstRequests = Array.from({length: 50}, (_, i) => 
          axios.get(`https://pokeapi.co/api/v2/pokemon/${i+1}`).then((response) => {
            return response.data;
          }));
  
        const firstResponses: TPokemonNameAndImg[] = await Promise.all(firstRequests);
  
        setPokemonList(firstResponses);

        //?Sequential
        /* for (var i=1; i <= 50; i++) {
          await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`).then((response) => {
            const pokemon: TPokemonNameAndImg = response.data;
            newList.push(pokemon);
          })
        }
        setPokemonList(newList); */
        
  
        const secondRequests = Array.from({length: (493-50)}, (_, i) => 
          axios.get(`https://pokeapi.co/api/v2/pokemon/${i+51}`).then((response) => {
            return response.data;
          }));
  
        const secondResponses: TPokemonNameAndImg[] = await Promise.all(secondRequests);
  
        addPokemonArrayToPokemonList(secondResponses);
  
      } catch (error){
        console.log('Error fetching Pokemon data:', error);
      } finally{
        //
      }
    },[])

    const value = {pokemonList, setPokemonList, filteredPokemonList, setFilteredPokemonList};
    
    console.log('POKEMON LIST end of context:',pokemonList);

    return(
        <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
    )
}