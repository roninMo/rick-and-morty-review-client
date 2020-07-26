import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import APIURL from "../helpers/environment";

const Signin = (props) => {
  // Handles user data that's inputted for logging in
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // Fetch to give user data to login
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${APIURL}/user/create`, {
      method: "POST",
      body: JSON.stringify({
        user: { username: username, email: email, password: password },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        props.updateToken(data.sessionToken);
        localStorage.setItem("reviewer", data.user.id);
        localStorage.setItem("reviewerName", data.user.username);
        console.log(data);
        console.log(
          localStorage.getItem("reviewer"),
          localStorage.getItem("reviewerName")
        );
      });
  };

  return (
    <Container>
      <Row>
        <Col md="3"></Col>

        <Col md="6">
          <h2>Sign up</h2>
          <br />
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="username">Username</Label>
              <Input
                onChange={(e) => setUsername(e.target.value)}
                name="username"
                value={username}
              />
            </FormGroup>
            {username === "" ? (
              <p>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <i>please type a username</i>
              </p>
            ) : (
              <p>&nbsp;</p>
            )}
            <br />

            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                value={email}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              />
            </FormGroup>
            {username === "" ? (
              <p>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <i>please type an email</i>
              </p>
            ) : (
              <p>&nbsp;</p>
            )}
            <br />

            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                type="password"
                value={password}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 5 or more characters"
              />
            </FormGroup>

            <Button outline color="primary" type="submit">
              Sign up
            </Button>
          </Form>
        </Col>

        <Col md="3"></Col>
      </Row>
    </Container>
  );
};
export default Signin;
