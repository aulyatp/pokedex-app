import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavBar from "../components/Navbar";

const PaldeaList = () => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPaldeaPokemon = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=105&offset=905");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Filter Pokemon with IDs between 906 and 1010
        const paldeaPokemon = data.results.filter((pokemon) => {
          const pokemonId = parseInt(pokemon.url.split("/")[6]);
          return pokemonId >= 906 && pokemonId <= 1010;
        });

        setPokemonList(paldeaPokemon);
      } catch (error) {
        console.error("Error fetching Paldea Pokemon list:", error);
      }
    };

    fetchPaldeaPokemon();
  }, []);

  const formatPokemonName = (name) => {
    // Capitalize first letter and replace "-" with space
    return name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, " ");
  };

  return (
    <Container fluid>
      <NavBar />
      <h1 className="my-4">Paldea Pokemon List</h1>
      <p>Here is a list of Paldea Pokemon with their sprites:</p>
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

export default PaldeaList;
