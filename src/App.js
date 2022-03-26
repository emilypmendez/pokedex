import axios from "axios";
import './App.css';
import { useState, useEffect } from "react";
import PokemonList from './PokemonList'
import Pagination from './Pagination'
import pokemonLogo from './assets/pokemon-logo.png'

const App = () => {

  const [pokemon, setPokemon] = useState("");
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState("");
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);

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

  // useEffect(() => {
  //      getPokemon();
  // }, []);

  useEffect(() => {
       setLoading(true)
       let cancel
       axios.get(currentPageUrl, {
            cancelToken: new axios.CancelToken(c => cancel = c)
       }).then(res => {
          setLoading(false) // render application after successful loading state
          setNextPageUrl(res.data.next)
          setPrevPageUrl(res.data.previous)
          setPokemonList(res.data.results.map(pokemon => pokemon.name)); // render a list of pokemon
       })
       // cancel previous request when making new request
       return () => cancel()
 }, [currentPageUrl]);

 function gotoNextPage() {
     setCurrentPageUrl(nextPageUrl.replace("limit=6", "limit=20"))
 }

  function gotoPrevPage() {
     setCurrentPageUrl(prevPageUrl.replace("limit=6", "limit=20"))
 }

 if (loading) return "Loading..."

  const handleSubmit = (e) => {
       e.preventDefault();
       getPokemon();
 }

 const handleChange = (e) => {
     setPokemon(e.target.value.toLowerCase());
}

  return (
    <div className="App">
      <header className="header">
        <img src={pokemonLogo} alt="pokemon-logo" className="pokemon-logo" />
        <h2><em>Gotta catch 'em all!</em></h2>
      </header>
      <div className="main-content">
          <div className="pokemon-searchbar">
               <form onSubmit={handleSubmit}>
                    <label>
                         <input type="text" onChange={handleChange} placeholder="search pokémon"/>
                    </label>
               </form>
               {pokemonData.map((data) => {
                    return (
                         <> {/* return all pokemon data */}
                         <div className="container">
                              <img src={data.sprites["front_default"]} alt="pokemon-choice"/>

                         <div className="divTable">
                              <div className="divTableBody">
                                   <div className="divTableRow">
                                        <div className="divTableCell"> Type </div>
                                        <div className="divTableCell">{pokemonType}</div>
                                   </div>
                                   <div className="divTableRow">
                                        <div className="divTableCell"> Height </div>
                                        <div className="divTableCell">{" "}{Math.round(data.height * 3.9)} "</div>
                                   </div>
                                   <div className="divTableRow">
                                        <div className="divTableCell"> Weight </div>
                                        <div className="divTableCell">{" "}{Math.round(data.weight * 4.3)} lbs</div>
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
          <div className="pokemon-list">
               <h1>List of All Pokémon</h1>
               <PokemonList pokemonList={pokemonList} />
          </div><br/>
          <div className="pagination-buttons">
               <Pagination
                 gotoNextPage={nextPageUrl ? gotoNextPage : null}
                 gotoPrevPage={prevPageUrl ? gotoPrevPage : null} />
          </div>
          <br/>
      </div>
      <br/><br/>
      <div className="footer-content">
      Developed with ♥ by <a href="http://www.emilypmendez.com">Emily Portalatin-Mendez</a>
      </div>
      <br/><br/>
    </div>
  );
}

export default App;
