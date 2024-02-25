import React, { useState, createContext, useEffect } from "react";

export type TPokemonContext = {
    pokemonList: TPokemonListItem[];
    setPokemonList: (pokemonList: TPokemonListItem[]) => void;
    filteredPokemonList: TPokemonListItem[];
    setFilteredPokemonList: (pokemonList: TPokemonListItem[]) => void;

}

export type TPokemonListItem = {
    name: string,
    id: number
}

export const PokemonContext = createContext<TPokemonContext | null>(null);

type TPokemonProvider = {
    children: React.ReactNode,    
}

export const PokemonProvider = ({children}:TPokemonProvider) => {
    const [pokemonList, setPokemonList] = useState<TPokemonListItem[]>([]);
    const [filteredPokemonList, setFilteredPokemonList] = useState<TPokemonListItem[]>([]);

    useEffect(
        () =>{
        const fetchCall = async () => {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=151');
            const pokemon: {results: {name: string}[]} = await response.json();
            console.log(pokemon, ' in context here');
            setPokemonList(pokemon.results.map((pokemon, i) => ({name: pokemon.name, id: i+1})));
        }
        fetchCall();
    },[]);

    const value = {pokemonList, setPokemonList, filteredPokemonList, setFilteredPokemonList};

    return(
        <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
    )
}