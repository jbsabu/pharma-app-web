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
  Dropdown,
  DropdownButton,
  Modal,
  Accordion,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddDrug() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    newAgonist: "",
    newAntagonist: "",
    newAntagonistAffinity: "",
    newAgonistAffinity: "",
    name: "",
  });
  const [categoryInp, setCategoryInp] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [agonistInp, setAgonistInp] = useState([]);
  const [antagonistInp, setAntagonistInp] = useState([]);
  const [agonists, setAgonists] = useState({});
  const [antagonists, setAntagonists] = useState({});
  const [moas, setMoas] = useState([]);

  const [agonInput, setAgonInput] = useState({ agonist: "", affinity: "" });
  const [antagonInput, setAntagonInput] = useState({
    agonist: "",
    affinity: "",
  });

  const [moaInput, setMoaInput] = useState({
    name: "",
    target: "",
    source: "",
  });
  const [moaInp, setMoaInp] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalBody, setModalBody] = useState("");

  const handleClose = () => {
    setModalShow(false);
    setTimeout(() => {
      setModalBody("Name & affinity are both required.");
    }, 100);
  };
  const handleShow = () => setModalShow(true);

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData, // shallow copy all previous state
      [name]: value, // update specific key/value
    }));
  };

  const onMOADelete = (name) => {
    const moaCopy = moas;
    setMoas((oldMoas) => {
      const oldMoa = oldMoas;
      delete oldMoa[name];
      return oldMoa;
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const c1Index = ["Name", "Subtype"];
    const checkOne = [formData.name, formData.subtype];
    const checkTwo = [
      Object.keys(agonists).length,
      Object.keys(antagonists).length,
      Object.keys(moas).length,
    ];

    checkOne.forEach((item, i) => {
      if (item === "" || item === undefined || !item) {
        setModalBody(`${c1Index[i]} is required.`);
        setModalShow(true);
        return
      }
    });
    let count = 0;
    checkTwo.forEach((item, i) => {
      if (item === 0 || item === undefined) {
        count += 1;
      }
    });
    if (count === 3) {
      setModalBody(
        `At least one agonist, antagonist, or mechanism of action is required.`
      );
      setModalShow(true);
      return
    }
    if (Object.keys(categories).length === 0) {
      setModalBody(`At least one category is required.`);
      setModalShow(true);
      return
    }
    console.log(count, checkTwo, moas);
    console.log(formData);
    console.log(agonists, antagonists, moas, categories, "?");
    const moaArray = Object.keys(moas).map((key) => {
      return { target: key, name: moas[key] };
    });
    const fullData = {
      name: formData.name,
      subtype: formData.subtype,
      moa: moaArray,
      structure: formData.structure,
      category: Object.keys(categories),
      agonist: Object.keys(agonists),
      antagonist: Object.keys(antagonists),
      affinities: {
        agonist: agonists,
        antagonist: antagonists,
      },
    };
    console.log(fullData);
    const config = {
      method: "post",
      url: "http://localhost:3031/adddrug",
      data: fullData,
      headers: {
        authorization: localStorage.getItem("token"),
      }
    };
    axios(config)
      .then((res) => {
        console.log(res);
     
        console.log(res);
        if (res.status && res.status === 200) {
            setModalBody("Added to database.");
            setModalShow(true);
          navigate("/druglist");
        }
          else if (res.body.message) {
            setModalBody(res.body.message);
            setModalShow(true);
            navigate("/adddrug/");
          }
      }).catch((err) => {
        console.log(err);
        setModalBody("Error adding drug :: " + err);
        setModalShow(true);
        if (err.response.status === 401) {
          navigate("/login");
          localStorage.removeItem("token");
        }
      });
    
           // navigate(e.target.id)
      ;
  };

  const onAgonistDelete = (name) => {
    const agCopy = agonists;

    setAgonists((oldAgonists) => {
      const oldAg = oldAgonists;
      delete oldAg[name];
      return oldAg;
    });
    console.log(agonists);
  };

  const onCategoryDelete = (name) => {
    const catCopy = categories;
    setCategories((oldCategories) => {
      const oldCat = oldCategories;
      delete oldCat[name];
      return oldCat;
    });
  };

  const onAntagonistDelete = (name) => {
    setAntagonists((oldAntagonists) => {
      const oldAn = oldAntagonists;
      delete oldAn[name];
      console.log(name);
      console.log(oldAn);
      return oldAn;
    });
    console.log(antagonists);
  };

  const newField = (name, label, setState, state, onDelete) => {
    console.log(agonistInp);
    // console.log(label);
    const component = (
      <ListGroup.Item key={label}>
        <Button
          variant="outline-secondary"
          id="button-addon1"
          className="delete"
          onClick={(e) => {
            deleteField(label, setState, state); //  setState, state
            const call = onDelete ? onDelete(label) : () => {};
          }}
        >
          X
        </Button>
        <span>&nbsp;</span>
        {label}
      </ListGroup.Item>
    );
    console.log([...state, component]);
    setState([...state, component]); //
  };

  const newMOA = (target, name, setState, state, onDelete) => {
    console.log(agonistInp);
    // console.log(label);
    const component = (
      <ListGroup.Item key={name}>
        <Container>
          {" "}
          <Row>
            <span className="data-spec">target: {target}</span>
          </Row>
          <Row>
            <span className="data-spec">action: {name}</span>
          </Row>
          <br />
          <Button
            variant="outline-secondary"
            id="button-addon1"
            className="delete"
            onClick={(e) => {
              deleteField(name, setState, state); //  setState, state
              const call = onDelete ? onDelete(name) : () => {};
            }}
          >
            X
          </Button>
        </Container>
      </ListGroup.Item>
    );
    console.log([...state, component]);
    setState([...state, component]); //
  };

  const deleteField = (name, setState, state) => {
    setState((prevState) => prevState.filter((item) => item.key !== name));
    console.log(agonistInp, state);
  };

const [tStyles, setTStyles] = useState({});

  return (
    <>
      <br />
      <Container>

        <Accordion defaultActiveKey={"0"} className="add-substance-accord">
        {/* <Button onClick={()=>{setTStyles((tStyles !== undefined)? undefined : "button2")}} className={tStyles}>

        </Button>    */}
          <Accordion.Item eventKey="1">
            <Accordion.Header>Review & Submit</Accordion.Header>
            <Accordion.Body>
              <Container>
                <Row>
                  <Col>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <span className="data-spec">substance name</span>{" "}
                        {formData.name}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <span className="data-spec">subtype</span>{" "}
                        {formData.subtype}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <span className="data-spec">structure</span>{" "}
                        {formData.structure}
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>

                  <Col>
                    <Accordion>
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>
                          Agonists : {Object.keys(agonists).length}
                        </Accordion.Header>
                        <Accordion.Body>
                          <div style={{ display: "flex" }}>
                            <ListGroup variant="flush">{agonistInp}</ListGroup>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="1">
                        <Accordion.Header>
                          Antagonists : {Object.keys(antagonists).length}
                        </Accordion.Header>
                        <Accordion.Body>
                          <div style={{ display: "flex" }}>
                            <ListGroup variant="flush">
                              {antagonistInp}
                            </ListGroup>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="2">
                        <Accordion.Header>
                          MOAs : {Object.keys(moas).length}
                        </Accordion.Header>
                        <Accordion.Body>
                          <div style={{ display: "flex" }}>
                            <ListGroup variant="flush">{moaInp}</ListGroup>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="3">
                        <Accordion.Header>
                          Categories : {Object.keys(categories).length}
                        </Accordion.Header>
                        <Accordion.Body>
                          <div style={{ display: "flex" }}>
                            <ListGroup variant="flush">{categoryInp}</ListGroup>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Col>
                </Row>
                <Button onClick={onSubmit}>Submit Substance</Button>
              </Container>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="0">
            <Accordion.Header>
              {!(formData.name === "" || formData.name === undefined)
                ? formData.name
                : "New Substance"}
            </Accordion.Header>
            <Accordion.Body>
              {/* <Button
                onClick={() => {
                  console.log(
                    agonists,
                    antagonists,
                    "moas",
                    moas,
                    "cat",
                    categories,
                    formData.name,
                    formData.subtype,
                    formData.structure
                  );
                }}
              ></Button> */}
              <Modal show={modalShow} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {modalBody !== ""
                    ? modalBody
                    : "Name & affinity are both required."}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
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
                        if (!formData["newAgonist"]) {
                          setModalShow(true);
                          return;
                        }
                        if (!formData["newAgonistAffinity"]) {
                          setModalShow(true);
                          return;
                        }
                        if (
                          !(
                            formData["newAgonistAffinity"].includes("µM") ||
                            formData["newAgonistAffinity"].includes("nM")
                          )
                        ) {
                          setModalBody("Dissociation constant required.");
                          setModalShow(true);
                          return;
                        }
                        newField(
                          "agonist",
                          `${formData["newAgonist"]} @ ${formData["newAgonistAffinity"]}`,
                          setAgonistInp,
                          agonistInp,
                          () => onAgonistDelete(cached)
                        );
                        setAgonists((prevData) => ({
                          ...prevData, // shallow copy all previous state
                          [formData["newAgonist"]]:
                            formData["newAgonistAffinity"], // update specific key/value
                        }));
                        setFormData((_formData) => {
                          return {
                            ..._formData,
                            newAgonist: "",
                            newAgonistAffinity: "",
                          };
                        });

                        setAgonInput({ agonist: "", affinity: "" });
                      }}
                    >
                      Add
                    </Button>{" "}
                    <Form.Control
                      value={agonInput.agonist}
                      aria-label="Example text with button addon"
                      aria-describedby="basic-addon1"
                      name="newAgonist"
                      onChange={(e) => {
                        onChange(e);
                        setAgonInput(e.target.value);
                      }}
                    />
                    <InputGroup.Text>
                      <b>K</b>
                      <sub>i</sub>
                    </InputGroup.Text>
                    <Form.Control
                      aria-label="affinity"
                      value={agonInput.affinity}
                      name="newAgonistAffinity"
                      onChange={(e) => {
                        if (
                          !(
                            Number(e.target.value) ||
                            e.target.value === " " ||
                            e.target.value === ""
                          )
                        )
                          return;
                        onChange(e);
                        setAgonInput({
                          ...agonInput,
                          affinity: e.target.value,
                        });
                      }}
                    />
                    <DropdownButton
                      variant="outline-primary"
                      title="dissoc."
                      id="input-group-dropdown-1"
                    >
                      <Dropdown.Item
                        href="#"
                        onClick={(e) => {
                          let str = formData.newAgonistAffinity
                            .replace("µM", "")
                            .replace("nM", "");
                          setAgonInput({
                            ...agonInput,
                            affinity: `${str}µM`,
                          });
                          setFormData({
                            ...formData,
                            newAgonistAffinity: `${str}µM`,
                          });
                        }}
                      >
                        µM
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="#"
                        onClick={(e) => {
                          let str = formData.newAgonistAffinity
                            .replace("µM", "")
                            .replace("nM", "");
                          setAgonInput({
                            ...agonInput,
                            affinity: `${str}nM`,
                          });
                          setFormData({
                            ...formData,
                            newAgonistAffinity: `${str}nM`,
                          });
                        }}
                      >
                        nM
                      </Dropdown.Item>
                    </DropdownButton>
                  </InputGroup>

                  <hr />
                  <div style={{ display: "flex" }}>
                    <div className="add-field-container">
                      <ListGroup variant="flush">
                        <ListGroup.Item>Agonists</ListGroup.Item>
                        {agonistInp}
                      </ListGroup>
                    </div>
                  </div>
                </Col>
                <Col>
                  <h3>antagonism</h3>

                  <InputGroup className="mb-3">
                    <Button
                      variant="outline-primary"
                      onClick={(e) => {
                        const cached = formData["newAntagonist"];
                        if (!formData["newAntagonist"]) {
                          setModalShow(true);
                          return;
                        }
                        if (!formData["newAntagonistAffinity"]) {
                          setModalShow(true);
                          return;
                        }
                        if (
                          !(
                            formData["newAntagonistAffinity"].includes("µM") ||
                            formData["newAntagonistAffinity"].includes("nM")
                          )
                        ) {
                          setModalBody("Dissociation constant required.");
                          setModalShow(true);
                          return;
                        }
                        newField(
                          "antagonist",
                          `${formData["newAntagonist"]} @ ${formData["newAntagonistAffinity"]}`,
                          setAntagonistInp,
                          antagonistInp,
                          () => onAntagonistDelete(antagonInput.antagonist)
                        );

                        setAntagonists((prevData) => ({
                          ...prevData, // shallow copy all previous state
                          [antagonInput.antagonist]: antagonInput.affinity, // update specific key/value
                        }));
                        setAntagonInput({ antagonist: "", affinity: "" });
                        setFormData((_formData) => {
                          _formData["newAntagonist"] = "";
                          _formData["newAntagonistAffinity"] = "";
                          return _formData;
                        });
                      }}
                      //        newField(
                      //   "agonist",
                      //   `${formData["newAgonist"]} @ ${formData["newAgonistAffinity"]}`,
                      //   setAgonistInp,
                      //   agonistInp,
                      //   () => onAgonistDelete(cached)
                      // );
                      // setAgonists((prevData) => ({
                      //   ...prevData, // shallow copy all previous state
                      //   [formData["newAgonist"]]:
                      //     formData["newAgonistAffinity"], // update specific key/value
                      // }));
                      // setFormData((_formData) => {
                      //   return {
                      //     ..._formData,
                      //     newAgonist: "",
                      //     newAgonistAffinity: "",
                      //   };
                      // });
                    >
                      Add
                    </Button>{" "}
                    <Form.Control
                      value={antagonInput.antagonist}
                      aria-label="Example text with button addon"
                      aria-describedby="basic-addon1"
                      name="newAntagonist"
                      onChange={(e) => {
                        onChange(e);
                        setAntagonInput({
                          ...antagonInput,
                          antagonist: e.target.value,
                        });
                      }}
                    />
                    <InputGroup.Text>
                      <b>K</b>
                      <sub>i</sub>
                    </InputGroup.Text>
                    <Form.Control
                      aria-label="affinity"
                      value={antagonInput.affinity}
                      name="newAntagonistAffinity"
                      onChange={(e) => {
                        if (
                          !(
                            Number(e.target.value) ||
                            e.target.value === " " ||
                            e.target.value === "" ||
                            e.target.value === "-"
                          )
                        )
                          return;
                        onChange(e);
                        setAntagonInput({
                          ...antagonInput,
                          affinity: e.target.value,
                        });
                      }}
                    />
                    <DropdownButton
                      variant="outline-primary"
                      title="dissoc."
                      id="input-group-dropdown-1"
                    >
                      <Dropdown.Item
                        href="#"
                        onClick={(e) => {
                          let str = formData.newAntagonistAffinity
                            .replace("µM", "")
                            .replace("nM", "");
                          setAntagonInput({
                            ...antagonInput,
                            affinity: `${str}µM`,
                          });
                          setFormData({
                            ...formData,
                            newAntagonistAffinity: `${str}µM`,
                          });
                        }}
                      >
                        µM
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="#"
                        onClick={(e) => {
                          let str = formData.newAntagonistAffinity
                            .replace("µM", "")
                            .replace("nM", "");
                          setAntagonInput({
                            ...antagonInput,
                            affinity: `${str}nM`,
                          });
                          setFormData({
                            ...formData,
                            newAntagonistAffinity: `${str}nM`,
                          });
                        }}
                      >
                        nM
                      </Dropdown.Item>
                    </DropdownButton>
                  </InputGroup>

                  <hr />
                  <div style={{ display: "flex" }}>
                    <div className="add-field-container">
                      <ListGroup variant="flush">
                        <ListGroup.Item>Antagonists</ListGroup.Item>
                        {antagonistInp}
                      </ListGroup>
                    </div>
                  </div>
                </Col>
              </Row>
              <br />
              <hr />
              <Row>
                <Col>
                  <div>
                    <div className="add-field-container">
                      <ListGroup variant="flush">
                        <ListGroup.Item>MOAs</ListGroup.Item>
                        {moaInp}
                      </ListGroup>
                    </div>
                  </div>
                </Col>
                <Col>
                  {" "}
                  <h3>mechanism of action</h3>
                  <Form.Label>Target</Form.Label>
                  <InputGroup className="mb-3">
                    {" "}
                    <Form.Control
                      value={moaInput.target}
                      aria-label="Example text with button addon"
                      aria-describedby="basic-addon1"
                      name="newMOATarget"
                      onChange={(e) => {
                        onChange(e);
                        setMoaInput((oldMoaInput) => {
                          return {
                            ...oldMoaInput,
                            target: e.target.value,
                          };
                        });
                      }}
                    />
                  </InputGroup>
                  <Form.Label>Action</Form.Label>
                  <InputGroup className="mb-3">
                    {" "}
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={moaInput.name}
                      aria-label="Example text with button addon"
                      aria-describedby="basic-addon1"
                      name="newMOA"
                      onChange={(e) => {
                        onChange(e);
                        setMoaInput((oldMoaInput) => {
                          return {
                            ...oldMoaInput,
                            name: e.target.value,
                          };
                        });
                      }}
                    />
                  </InputGroup>
                  <Button
                    variant="outline-primary"
                    onClick={(e) => {
                      if (!formData["newMOA"] || !formData["newMOATarget"]) {
                        setModalBody("Target & action are both required.");
                        setModalShow(true);
                        return;
                      }
                      newMOA(
                        formData["newMOATarget"],
                        formData["newMOA"],
                        setMoaInp,
                        moaInp,
                        () => onMOADelete(formData["newMOATarget"])
                      );
                      setMoaInput({
                        target: "",
                        name: "",
                      });
                      setFormData((_formData) => ({
                        ..._formData,
                        newMOA: "",
                        newMOATarget: "",
                      }));
                      setMoas((prevData) => ({
                        ...prevData, // shallow copy all previous state
                        [formData["newMOATarget"]]: formData["newMOA"], // update specific key/value
                      }));
                    }}
                  >
                    Add
                  </Button>
                  <hr />
                </Col>
                <Col>
                  <h3>categories</h3>

                  <InputGroup className="mb-3">
                    <Button
                      variant="outline-primary"
                      onClick={(e) => {
                        if (!formData["newCategory"]) {
                          setModalShow(true);
                          setModalBody("Category term required.");

                          return;
                        }
                        newField(
                          "category",
                          formData["newCategory"],
                          setCategoryInp,
                          categoryInp,
                          () => onCategoryDelete(formData["newCategory"])
                        );
                        setCategoryInput("");
                        setFormData((_formData) => ({
                          ..._formData,
                          newCategory: "",
                        }));
                        setCategories((prevData) => ({
                          ...prevData, // shallow copy all previous state
                          [formData["newCategory"]]: true, // update specific key/value
                        }));
                      }}
                    >
                      Add
                    </Button>{" "}
                    <Form.Control
                      value={categoryInput}
                      aria-label="Example text with button addon"
                      aria-describedby="basic-addon1"
                      name="newCategory"
                      onChange={(e) => {
                        onChange(e);
                        setCategoryInput(e.target.value);
                      }}
                    />
                  </InputGroup>

                  <hr />
                  <div style={{ display: "flex" }}>
                    <div className="add-field-container">
                      <ListGroup variant="flush">
                        <ListGroup.Item>Categories</ListGroup.Item>
                        {categoryInp}
                      </ListGroup>
                    </div>
                  </div>
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </>
  );
}
