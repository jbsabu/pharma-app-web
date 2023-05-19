import { Col, Container, Row, Form, Button, Accordion } from "react-bootstrap";
// import {auth, signInWithEmailAndPassword,signInWithGoogle } from "../functions/authentication";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../functions/authentication";

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default function Login() {
  return (
    <Container md={4}>
      <Row flex>
        <Col>
          <br />
          <Accordion flush>
            <Accordion.Item>
              <Accordion.Header>Login with email</Accordion.Header>
              <Accordion.Body>
                <Row flex>
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" />
                      <Form.Text className="text-muted">
                        We'll always share your email with everyone else.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicCheckbox"
                    ></Form.Group>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                </Row>
              </Accordion.Body>
            </Accordion.Item>

            {/* <Accordion.Header>Login with google</Accordion.Header>
            <Accordion.Body>
              <button className="login__btn login__google">
                Login with Google
              </button>
            </Accordion.Body>
            <Accordion.Item></Accordion.Item> */}
          </Accordion>
        </Col>
        <Col>
          <br />
         
        </Col>
      </Row>
    </Container>
  );
}
