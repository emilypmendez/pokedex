import React, { useState, useEffect } from 'react'
import song from '../assets/OpeningMovie.wav'

export default function MusicButton() {

    // set up audio functionality in custom hook feature
     const useAudio = (song) => {
       const [audio] = useState(new Audio(song, {loop: true, volume: 1}));
       const [playing, setPlaying] = useState(false);

       const toggle = () => setPlaying(!playing); // toggle function

       useEffect(() => { // set up the play and pause feature
          playing ? audio.play() : audio.pause();
        }, [playing, audio] );

       useEffect(() => { // set up the end feature
        const handleEnd = () => setPlaying(false); // Define the handleEnd function

        audio.addEventListener('ended', handleEnd);
        return () => {
          audio.removeEventListener('ended', handleEnd); // Pass the function reference instead of the arrow function
        };
      }, [audio]);

       return [playing, toggle]; // limit the render
     };

     // declare toggle feature
     const [playing, toggle] = useAudio(song);

     return (
          <>
               <div>
                 <button onClick={toggle} className="music-button"> {playing ? "Pause Music" : "Play Music"} </button>
               </div>
          </>
     )
}
