import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';

function App() {
  const [searchInput, setSearchInput] = useState("");
  return (
    <>
      <Container>
        <InputGroup className='mb-3' size='lg'>
          <FormControl
          placeholder='Search for songs'
          type='input'
          onKeyDown={event =>  {
            if(event.key == "Enter")  {
              console.log("input confirmed")
            }
          }}
          onChange={event =>  {
            setSearchInput(event.target.value)
          }} 
          />
          <Button onClick={ ()  => {
            console.log('Button pressed')
          }}>
            Search
          </Button>
        </InputGroup>
      </Container>
      
    </>
  )
}

export default App
