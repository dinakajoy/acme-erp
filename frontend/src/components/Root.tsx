import React from 'react';
import Button from '@mui/material/Button';
import { Counter } from './reusables/counter/Counter';

const Root = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Counter />
        <Button variant="contained">Hello World</Button>
      </header>
    </div>
  );
}

export default Root;
