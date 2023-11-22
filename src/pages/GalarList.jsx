import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavBar from "../components/Navbar";

const GalarList = () => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchGalarPokemon = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=96&offset=809");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Filter Pokemon with IDs between 810 and 905
        const galarPokemon = data.results.filter((pokemon) => {
          const pokemonId = parseInt(pokemon.url.split("/")[6]);
          return pokemonId >= 810 && pokemonId <= 905;
        });

        setPokemonList(galarPokemon);
      } catch (error) {
        console.error("Error fetching Galar Pokemon list:", error);
      }
    };

    fetchGalarPokemon();
  }, []);

  const formatPokemonName = (name) => {
    // Capitalize first letter and replace "-" with space
    return name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, " ");
  };

  return (
    <Container fluid>
      <NavBar />
      <h1 className="my-4">Galar Pokemon List</h1>
      <p>Here is a list of Galar Pokemon with their sprites:</p>
      <Row xs={1} md={4} className="g-4">
        {pokemonList.map((pokemon) => (
          <Col key={pokemon.name}>
            <Card style={{ width: "18rem", marginBottom: "20px" }}>
              <Link to={`/detail/${pokemon.name}`} style={{ textDecoration: "none", color: "inherit" }}>
                <Card.Img variant="top" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split("/")[6]}.png`} alt={pokemon.name} style={{ height: "200px", objectFit: "cover" }} />
              </Link>
              <Card.Body>
                <Card.Title>{formatPokemonName(pokemon.name)}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default GalarList;
