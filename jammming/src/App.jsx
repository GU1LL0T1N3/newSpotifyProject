import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';

const CLIENTID = "61f0983a6f984e34aca1471ba0e3eca7";
const CLIENTSECRET = "b980fb15a5d5421c95fdac86eb42692b";

const redirectUri = 'http://127.0.0.1:8000/callback';

const authUrl = new URL("https://accounts.spotify.com/authorize");
const tokenEndpoint = "https://accounts.spotify.com/api/token";
const scope = 'playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public';

// Code Verifier
const generateRandomString = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}
// Code Challenge
const sha256 = async (plain) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(plain)
  return window.crypto.subtle.digest('SHA-256', data)
}

const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

const hashed = await sha256(codeVerifier)
const codeChallenge = base64encode(hashed);


const codeVerifier  = generateRandomString(64);
// Sets the generated code verifier into local storage
window.localStorage.setItem('code_verifier', codeVerifier);

const params =  {
  response_type: 'code',
  client_id: CLIENTID,
  scope: scope,
  code_challenge_method: 'S256',
  code_challenge: codeChallenge,
  redirect_uri: redirectUri,
}

authUrl.search = new URLSearchParams(params).toString();
window.location.href = authUrl.toString();

// Parsing the URL for code parameter
const urlParams = new URLSearchParams(window.location.search);
let code = urlParams.get('code');

const getToken = async code => {

  // stored in the previous step
  const codeVerifier = localStorage.getItem('code_verifier');

  const url = "https://accounts.spotify.com/api/token";
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: CLIENTID,
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  }

  const body = await fetch(url, payload);
  const response = await body.json();

  localStorage.setItem('access_token', response.access_token);
}


useEffect(()  =>  {
  //API Access Token

}, [])

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
      <Container>
        <Row className='mx-2 row row-cols-4'>
          <Card>
            <Card.Img src='#' />
            <Card.Body>
              <Card.Title>
                Album Name Here
              </Card.Title>
            </Card.Body>
          </Card>
        </Row>
        
      </Container>
    </>
  )
}

export default App
