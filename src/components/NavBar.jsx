import { useContext } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

export default function NavBar() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  function logout() {
    authContext.setToken(null);
    navigate("/");
  }

  return (
    <Navbar expand="lg" className="bg-light">
      <Container fluid>
        <Navbar.Brand href="/pokemonlist">National Pokedex</Navbar.Brand>
        <Navbar.Toggle aria-controls="login-app" />
        <Navbar.Collapse id="login-app">
          <Nav className="ms-auto">
            <Nav.Link href="/kantolist">Kanto</Nav.Link>
            <Nav.Link href="/johtolist">Johto</Nav.Link>
            <Nav.Link href="/hoennlist">Hoenn</Nav.Link>
            <Nav.Link href="/sinnohlist">Sinnoh</Nav.Link>
            <Nav.Link href="/unovalist">Unova</Nav.Link>
            <Nav.Link href="/kaloslist">Kalos</Nav.Link>
            <Nav.Link href="/alolalist">Alola</Nav.Link>
            <Nav.Link href="/galarlist">Galar</Nav.Link>
            <Nav.Link href="/paldealist">Paldea</Nav.Link>
            {/* <Nav.Link href="/dashboard">Home</Nav.Link> */}
            <Nav.Link href="/profile">About Us</Nav.Link>
            <Button className="ms-5" variant="danger" onClick={logout}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
