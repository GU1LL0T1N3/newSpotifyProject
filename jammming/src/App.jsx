import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';
import SearchBar from './components/SearchBar';
import Track from './components/Track'

function App() {
  const [searchInput, setSearchInput] = useState("");
  return (
    <>
      <SearchBar />
      <Track />
    </>
  )
}

export default App
