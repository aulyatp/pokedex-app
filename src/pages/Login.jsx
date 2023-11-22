import { useContext, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import userData from "../users.json";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect to another page if already logged in
  useEffect(() => {
    if (authContext.token) {
      navigate("/pokemonlist");
    }
  }, [authContext.token, navigate]);

  function login() {
    const isCorrectUser = userData.find((data) => data.email === email && data.password === password);

    if (isCorrectUser) {
      authContext.setToken("1234");
      navigate("/pokemonlist");
    } else {
      alert("Please check your email and password");
    }
  }

  return (
    <Container fluid className="my-5">
      <h1 className="my-5">Login to Your Account</h1>
      <div className="m-auto">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Form.Text className="text-muted">We will never share your email to any party.</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Button variant="primary" onClick={login}>
            Login
          </Button>
        </Form>
      </div>
    </Container>
  );
}
