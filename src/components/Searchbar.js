import React, { useState, useEffect, useCallback } from 'react'
import axios from "axios";

export default function Searchbar({ selectedPokemon }) {

  const [pokemon, setPokemon] = useState("");
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState("");
  const [error, setError] = useState('');
  const [cancelToken, setCancelToken] = useState(null);

  const getPokemon = useCallback( async (pokemonName) => {
     const toArray= [];

     try {
          const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
          const response = await axios.get(url);
          toArray.push(response.data);
          setPokemonType(response.data.types[0].type.name); // give us the pokemon type
          setPokemonData(toArray);
          console.log(response);
          setError(''); // clear the error message
     } catch(e) {
          if (axios.isCancel(e)) {
               // Request was canceled, no need to handle the error
               console.log('Request canceled:', e.message);
               setCancelToken();
          } else {
               console.log(e);
               setPokemonType('');
               setPokemonData([]);
               // Handle error when search value is not found
               if (e.response && e.response.status === 404) {
                    console.log('Pokémon not found.');
                    setError('Pokémon not found.'); // set the error message
               }
          }
     }
  }, []);

  useEffect(() => { //
    getPokemon(selectedPokemon); // props passed into getPokemon callback function
    // Clean up the cancel token when the component unmounts or when selectedPokemon changes
    return () => {
     if (cancelToken) {
       cancelToken.cancel('Request canceled: Component unmounted or new request made');
     }
   };
  }, [selectedPokemon, getPokemon, cancelToken]); // render dependency once for each pokemon click (on list of all pokemon)

  const handleSubmit = (e) => {
      e.preventDefault();
      getPokemon(pokemon); // return pokemon stats
  }

  const handleChange = (e) => {
      setPokemon(e.target.value.toLowerCase());
  }

  const resetChange = () => {
      alert(`Resetting the Pokédex! \n\n Click OK to continue.`);
      setPokemon('');
      setPokemonData([]);
      setPokemonType('');
      setError(''); // clear the error message
  }

  return (
    <>
      <div className="pokemon-searchbar">
           <form onSubmit={handleSubmit}>
                <label>
                     <input type="text" onChange={handleChange} placeholder="search for pokémon"/>
                     {error && <p className="error-message">{error}</p>}
                     <input type="reset" onClick={resetChange} defaultValue="Reset" /> {/* reset input */}
                </label>
           </form>
      </div>
      <div className="pokemon-results">
           {pokemonData.map((data) => {
                return (
                     <> {/* return all pokemon data */}
                     <div className="container" 
                         key={data.id}
                         >
                        <img src={data.sprites["front_default"]} alt="pokemon-choice"/>

                         <div className="divTable">
                              <div className="divTableBody">
                                   <div className="divTableRow">
                                        <div className="divTableCell"> Type </div>
                                        <div className="divTableCell">{pokemonType.toUpperCase()}</div>
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
                )})}
      </div>
    </>
  )
}
