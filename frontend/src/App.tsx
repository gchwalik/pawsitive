import { useState, useEffect } from 'react'
import axios from 'axios';

import './App.css'

function App() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8000/places/')
      .then(response => {
        setPlaces(response.data)
        console.log(response.data)
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <p>I am empty.</p>
  );
}

export default App
