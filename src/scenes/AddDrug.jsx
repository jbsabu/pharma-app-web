import { useState } from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  Form,
  Button,
  Card,
  ListGroup,
} from "react-bootstrap";

export default function AddDrug() {
  const [formData, setFormData] = useState({ newAgonist: "" });
  const [agonistInp, setAgonistInp] = useState([]);
  const [antagonistInp, setAntagonistInp] = useState([]);
  const [agonists, setAgonists] = useState({});
  const [antagonists, setAntagonists] = useState({});
  const [moas, setMoas] = useState([]);
  const [agonInput, setAgonInput] = useState("");

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData, // shallow copy all previous state
      [name]: value, // update specific key/value
    }));
  };

  const onAgonistDelete = (name) => {
    const agCopy = agonists;
    console.log("!!!!!!!!!!!!!!!!!!!!!!", name, agonists);
    // delete agCopy[name]

    // setAgonists(agCopy);
    // console.log(agonists)
  };

  const newField = (name, label, setState, state, onDelete) => {
    console.log(agonistInp)
    // console.log(label);
    const component = (
      <ListGroup.Item key={label}>
        <Button
          variant="outline-secondary"
          id="button-addon1"
          className="delete_"
          onClick={(e) => {
            deleteField(label,setState,state); //  setState, state
            // const call = onDelete ? onDelete(label) : () => {};
          }}
        >
          X
        </Button>
        <span>&nbsp;</span>
        {label}
      </ListGroup.Item>
    );
    console.log([...state, component])
    setState([...state, component]); // 
  };

  const deleteField = (name, setState, state) => {
    // setState(
    //   state.filter((item) => {
        
    //     console.log(item);
    //     if (item.key !== name) return item ;
    //   })
    // );
    console.log(agonistInp,state)
    // for (let i = 0; i < state.length; i++) {
    //   console.log(state[i].key,name,state[i].key === name);
        // if (state[i].key === name) {
        //     console.log("found");
        //     setState(state.splice(i, 1));
        //     return
        //     }
    // }
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <br />
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Name
              </InputGroup.Text>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                name="name"
                onChange={onChange}
                className="drug-input required"
                required
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Subtype
              </InputGroup.Text>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                name="subtype"
                onChange={onChange}
              />
            </InputGroup>
            <br />
            <Row>
              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Structure
                </InputGroup.Text>
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  name="structure"
                  onChange={onChange}
                />
              </InputGroup>
            </Row>
          </Col>
          <Col>
            <h3>agonism</h3>

            <InputGroup className="mb-3">
              <Button
                variant="outline-primary"
                onClick={(e) => {
                  const cached = formData["newAgonist"];
                  newField(
                    "agonist",
                    formData["newAgonist"],
                    setAgonistInp,
                    agonistInp,
                    () => onAgonistDelete(cached)
                  );
                  const _formData = formData;
                  _formData["newAgonist"] = "";
                  setFormData(_formData);
                  console.log(_formData);
                  setAgonInput("");
                  setAgonists((prevData) => ({
                    ...prevData, // shallow copy all previous state
                    [formData["newAgonist"]]: true, // update specific key/value
                  }));
                }}
              >
                Add
              </Button>{" "}
              <Form.Control
                value={agonInput}
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                name="newAgonist"
                onChange={(e) => {
                  onChange(e);
                  setAgonInput(e.target.value);
                }}
              />
            </InputGroup>
            <hr />
            <div style={{ display: "flex" }}>
              <div className="add-field-container">
                <ListGroup variant="flush">
                  <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                  {agonistInp}
                </ListGroup>
              </div>
            </div>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}
