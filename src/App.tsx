import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";

function App() {
  const [hello, setHello] = useState('')

  useEffect(() => {
    axios.get('/api/hello')
        .then(response => setHello(response.data))
        .catch(error => console.log(error))
  }, [])

  return (
    <div>
      {hello}
    </div>
  );
}

export default App;
