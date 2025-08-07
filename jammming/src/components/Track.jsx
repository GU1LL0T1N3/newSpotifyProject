import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';

function Track()    {
    return (
        <>
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

export default Track;