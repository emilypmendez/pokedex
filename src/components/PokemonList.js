import React, { useState } from 'react';
import '../assets/PokemonList.css';

export default function PokemonList({ setSelectedPokemon, pokemonList }) {
  
     const [hoveredPokemon, setHoveredPokemon] = useState(null);
     
     const handleMouseEnter = (pokemon) => {
          // Update state or apply styling for hover effect
          setHoveredPokemon(pokemon);
     };
     
     const handleMouseLeave = () => {
          // Update state or remove styling for hover effect
          setHoveredPokemon(null);
     };

     return (
          <>
               <div className='pokemon-list'>
                 {pokemonList?.map((pokemon) => (
                      <div 
                         key={pokemon} 
                         onClick={() => setSelectedPokemon(pokemon)}
                         onMouseEnter={() => handleMouseEnter(pokemon)}
                         onMouseLeave={handleMouseLeave}
                         style={{
                              cursor: 'pointer',
                              padding: '10px',
                              backgroundColor: hoveredPokemon === pokemon ? '#fff' : '',
                              fontWeight: hoveredPokemon === pokemon ? 'bold' : 'normal',
                            }}
                         className={`pokemon-item ${hoveredPokemon === pokemon ? 'hovered' : ''}`}
                      >
                         {pokemon}
                      </div>
                 ))}
               </div>
          </>
     )
}
