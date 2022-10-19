import React from 'react';
import Button from '@mui/material/Button';
import { Counter } from './components/counter/Counter';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Counter />
        <Button variant="contained">Hello World</Button>
      </header>
    </div>
  );
}

export default App;
