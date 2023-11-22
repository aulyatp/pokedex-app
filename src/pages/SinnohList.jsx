import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavBar from "../components/Navbar";

const SinnohList = () => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchSinnohPokemon = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=107&offset=386");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Filter Pokemon with IDs between 387 and 493
        const sinnohPokemon = data.results.filter((pokemon) => {
          const pokemonId = parseInt(pokemon.url.split("/")[6]);
          return pokemonId >= 387 && pokemonId <= 493;
        });

        setPokemonList(sinnohPokemon);
      } catch (error) {
        console.error("Error fetching Sinnoh Pokemon list:", error);
      }
    };

    fetchSinnohPokemon();
  }, []);

  const formatPokemonName = (name) => {
    // Capitalize first letter and replace "-" with space
    return name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, " ");
  };

  return (
    <Container fluid>
      <NavBar />
      <h1 className="my-4">Sinnoh Pokemon List</h1>
      <p>Here is a list of Sinnoh Pokemon with their sprites:</p>
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

export default SinnohList;
