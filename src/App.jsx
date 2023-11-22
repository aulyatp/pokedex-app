import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import RequireAuth from "./components/RequireAuth";
import useLocalStorage from "use-local-storage";
import Login from "./pages/Login";
import PokemonList from "./pages/PokemonList";
// import { useState } from "react";
import PokemonDetail from "./pages/PokemonDetail";
import KantoList from "./pages/KantoList";
import JohtoList from "./pages/JohtoList";
import HoennList from "./pages/HoennList";
import SinnohList from "./pages/SinnohList";
import UnovaList from "./pages/UnovaList";
import KalosList from "./pages/KalosList";
import AlolaList from "./pages/AlolaList";
import GalarList from "./pages/GalarList";
import PaldeaList from "./pages/PaldeaList";
import Profile from "./pages/Profile";

export default function App() {
  const [token, setToken] = useLocalStorage("token", null);
  const [data, setData] = useState(null);
  const [isLoaded, setisLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("One Piece");

  const [modalShow, setModalShow] = useState(false);
  const [modalItem, setModalItem] = useState(null);

  useEffect(() => {
    const fetchData = async (query) => {
      setIsLoading(true);
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
        if (response.status === 200) {
          setData(response.data);
          setisLoaded(true);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Error fetching Pokemon list:", err);
        setIsLoading(false);
      }
    };

    if (!isLoaded) {
      fetchData(query);
    }
  }, [isLoaded, query]);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Login />} path="/login" />
          <Route
            element={
              <RequireAuth>
                <PokemonList />
              </RequireAuth>
            }
            path="/pokemonlist"
          />

          <Route
            element={
              <RequireAuth>
                <PokemonDetail />
              </RequireAuth>
            }
            path="/detail/:name"
          />
          <Route
            element={
              <RequireAuth>
                <KantoList />
              </RequireAuth>
            }
            path="/kantolist"
          />
          <Route
            element={
              <RequireAuth>
                <JohtoList />
              </RequireAuth>
            }
            path="/johtolist"
          />
          <Route
            element={
              <RequireAuth>
                <HoennList />
              </RequireAuth>
            }
            path="/hoennlist"
          />
          <Route
            element={
              <RequireAuth>
                <SinnohList />
              </RequireAuth>
            }
            path="/sinnohlist"
          />
          <Route
            element={
              <RequireAuth>
                <UnovaList />
              </RequireAuth>
            }
            path="/unovalist"
          />
          <Route
            element={
              <RequireAuth>
                <KalosList />
              </RequireAuth>
            }
            path="/kaloslist"
          />
          <Route
            element={
              <RequireAuth>
                <AlolaList />
              </RequireAuth>
            }
            path="/alolalist"
          />
          <Route
            element={
              <RequireAuth>
                <GalarList />
              </RequireAuth>
            }
            path="/galarlist"
          />
          <Route
            element={
              <RequireAuth>
                <PaldeaList />
              </RequireAuth>
            }
            path="/paldealist"
          />
          <Route
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
            path="/profile"
          />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
