
import './App.css';
import { useState, useEffect } from "react";
import axios from "axios";
import PokemonList from './components/PokemonList'
import Pagination from './components/Pagination'
import MusicButton from './components/MusicButton'
import Searchbar from './components/Searchbar'
import pokemonLogo from './assets/pokemon-logo.png'

export default function App() {


  const [pokemonList, setPokemonList] = useState([]);

  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();

  const [loading, setLoading] = useState(true);

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

  return (
    <div className="App">
      <header className="header">
        <img src={pokemonLogo} alt="pokemon-logo" className="pokemon-logo" />
        <h2><em>Gotta catch em all!</em></h2>
      </header>
      <div className="main-content">
          <Searchbar />
          <div className="pokemon-list">
               <h1>List of All Pokémon</h1>
               <PokemonList pokemonList={pokemonList} />
          </div><br/>
          <div className="pagination-buttons">
               <Pagination
                 gotoNextPage={nextPageUrl ? gotoNextPage : null}
                 gotoPrevPage={prevPageUrl ? gotoPrevPage : null} />
          </div>
          <br/><br/>
          <MusicButton />
      </div>

      <br/><br/>

      <div className="footer-content">
      2022 © Developed with ♥ by <a href="https://www.emilypmendez.com">Emily Portalatin-Mendez</a>
      </div>
      
      <br/><br/>
    </div>
  );
}
