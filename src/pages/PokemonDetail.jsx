import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/Navbar";
import { Container, Card } from "react-bootstrap";

const PokemonDetail = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error("Error fetching Pokemon details:", error);
      }
    };

    fetchPokemon();
  }, [name]);

  if (!pokemon) {
    return <div>Loading...</div>; // You can show a loading indicator here
  }

  const formatPokemonName = (name) => {
    // Capitalize first letter and replace "-" with space
    return name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, " ");
  };

  return (
    <Container>
      <NavBar />
      <h1 className="my-4">Pokemon Detail {formatPokemonName(pokemon.name)}</h1>
      <Card style={{ width: "24rem" }}>
        <Card.Img variant="top" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt={pokemon.name} style={{ height: "200px", objectFit: "cover" }} />
        <Card.Body>
          <Card.Title>{formatPokemonName(pokemon.name)}</Card.Title>
          <Card.Text>
            ID: {pokemon.id} - Type: {pokemon.types.map((type) => type.type.name).join(", ")}
          </Card.Text>
          {/* Add additional details as needed */}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PokemonDetail;
