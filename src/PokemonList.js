import React from 'react'

export default function PokemonList({ pokemonList }) {
     return (
          <>
               <div>
                 {pokemonList?.map(pokemon => (
                      <div key={pokemon}>{pokemon}</div>
                 ))}
               </div>
          </>
     )
}
