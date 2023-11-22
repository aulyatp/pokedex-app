import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import NavBar from "../components/Navbar";
import userData from "../users.json";

export default function Profile(props) {
  return (
    <>
      <Container fluid className="text-center">
        <NavBar />
        <h1 className="my-5">30th Group Profile</h1>
        <Row xs={1} md={2} className="g-4">
          {userData.map((data) => (
            <Col key={data.username}>
              <Card>
                <Card.Img className="avatar-component" variant="top" src={data.image} />
                <Card.Body>
                  <Card.Title>{data.name}</Card.Title>
                  <Card.Text>Email: {data.email}</Card.Text>
                  <Card.Text>NIM: {data.nim}</Card.Text>
                  <Card.Text>Username: {data.username}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
