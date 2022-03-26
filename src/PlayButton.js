import React from 'react'
import useSound from 'use-sound';
import song from './assets/OpeningMovie.wav'

export default function PlayButton() {

     const [play] = useSound(song);

     return (
          <>
               <div>
                 <button onClick={play} className="music-button">Play Music</button>
               </div>
          </>
     )
}
