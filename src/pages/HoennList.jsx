import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavBar from "../components/Navbar";

const HoennList = () => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchHoennPokemon = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=135&offset=251");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Filter Pokemon with IDs between 252 and 386
        const hoennPokemon = data.results.filter((pokemon) => {
          const pokemonId = parseInt(pokemon.url.split("/")[6]);
          return pokemonId >= 252 && pokemonId <= 386;
        });

        setPokemonList(hoennPokemon);
      } catch (error) {
        console.error("Error fetching Hoenn Pokemon list:", error);
      }
    };

    fetchHoennPokemon();
  }, []);

  const formatPokemonName = (name) => {
    // Capitalize first letter and replace "-" with space
    return name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, " ");
  };

  return (
    <Container fluid>
      <NavBar />
      <h1 className="my-4">Hoenn Pokemon List</h1>
      <p>Here is a list of Hoenn Pokemon with their sprites:</p>
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

export default HoennList;
