import React from 'react'
// import axios from "axios";

export default function PokemonList({ gotoNextPage, gotoPrevPage }) {

     return (
          <div>
               {gotoPrevPage && <button onClick={gotoPrevPage}>Previous</button>}
               {gotoNextPage && <button onClick={gotoNextPage}>Next Page</button>}
          </div>
     )
}
