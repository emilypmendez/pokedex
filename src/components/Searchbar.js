import React, { useState } from 'react'
import axios from "axios";

export default function Searchbar() {

  const [pokemon, setPokemon] = useState("");
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState("");

  const getPokemon = async () => {
     const toArray= [];

     try {
          const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
          const response = await axios.get(url);
          toArray.push(response.data);
          setPokemonType(response.data.types[0].type.name); // give us the pokemon type
          setPokemonData(toArray);
          console.log(response);
     } catch(e) {
          console.log(e);
     }
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      getPokemon();
  }

  const handleChange = (e) => {
      setPokemon(e.target.value.toLowerCase());
  }

  return (
    <>
      <div className="pokemon-searchbar">
           <form onSubmit={handleSubmit}>
                <label>
                     <input type="text" onChange={handleChange} placeholder="search pokémon"/>
                </label>
           </form>
           {pokemonData.map((data, id) => {
                return (
                     <> {/* return all pokemon data */}
                     <div className="container">
                        <img src={data.sprites["front_default"]} alt="pokemon-choice"/>

                         <div className="divTable" key={data.id}>
                              <div className="divTableBody">
                                   <div className="divTableRow">
                                        <div className="divTableCell"> Type </div>
                                        <div className="divTableCell">{pokemonType}</div>
                                   </div>
                                   <div className="divTableRow">
                                        <div className="divTableCell"> Height </div>
                                        <div className="divTableCell">{" "}{Math.round(data.height * 3.9)} ''</div>
                                   </div>
                                   <div className="divTableRow">
                                        <div className="divTableCell"> Weight </div>
                                        <div className="divTableCell">{" "}{Math.round(data.weight * 0.3)} lbs</div>
                                   </div>
                                   <div className="divTableRow">
                                        <div className="divTableCell"> Number of Battles </div>
                                        <div className="divTableCell">{data.game_indices.length}</div>
                                   </div>
                              </div>
                         </div>
                     </div>
                     </>
                )
           })}
      </div>
    </>
  )
}
