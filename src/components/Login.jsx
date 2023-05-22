import { Col, Container, Row, Form, Button, Accordion } from "react-bootstrap";
// import {auth} from "../functions/authentication";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../functions/authentication";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData, // shallow copy all previous state
      [name]: value, // update specific key/value
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(formData)
    await signInWithEmailAndPassword(auth, formData.email, formData.password).then(async res=>{
      console.log(res)
      const config = {

        url: 'http://localhost:3031/verifyAuth',
        headers:{
          authentication: res.user.accessToken
        }
      }
      await axios(config).then(resp=>{
        console.log(resp)
        if (resp.status === 200) {
          console.log("?!!!")
          if ((resp.data.authorization) && resp.data.authorization ===  res.user.accessToken) {
            console.log("!!!!!")
          localStorage.setItem("token", res.user.accessToken);
          navigate('/')
          }
        }
      })

    }).catch(console.log)
  }
  

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
                      <Form.Control type="email" placeholder="Enter email" name="email" onChange={onChange} />
                      <Form.Text className="text-muted">
                        We'll always share your email & password with everyone else.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" name="password" onChange={onChange}/>
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicCheckbox"
                    ></Form.Group>
                    <Button variant="primary" type="submit" onClick={onSubmit}>
                      Submit
                    </Button>
                  </Form>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
        <Col>
          <br />
         
        </Col>
      </Row>
    </Container>
  );
}
