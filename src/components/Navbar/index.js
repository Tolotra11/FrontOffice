import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import { Link} from 'react-router-dom';

  
const Navbarre = () => {
  return (
    <>
    
     <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand  as={Link} to="#home">Enchere</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/listeEnchere">Liste Enchere</Nav.Link>
            <Nav.Link  as={Link} to="/redirecHistorique">Historique</Nav.Link>
            <Nav.Link  as={Link} to="/recherche">Recherche</Nav.Link>
            <Nav.Link  as={Link} to= "/deconnexion">Deconnexion</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      
    </>
  );
};
  
export default Navbarre;