import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Spinner,
  Col,
  Accordion,
  ListGroup,
  Table,
  Tab,
  Tabs,
  Button,
  Modal,
} from "react-bootstrap";
import AddDrug from "../scenes/AddDrug";
import { Trash } from "react-bootstrap-icons";
import { isLoggedIn } from "../functions/authentication";
import { useNavigate } from "react-router-dom";

export default function DrugList() {
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalBody, setModalBody] = useState("");
  const navigate = useNavigate();
  const handleClose = () => {
    setModalShow(false);
    setTimeout(() => {
      setModalBody("Do not feed the animals");
    }, 100);
  };
  const handleShow = () => setModalShow(true);

  const getData = async () => {
    const config = {
      method: "get",
      url: "http://localhost:3031/getdrugs",
    };

    await axios(config).then((response) => {
      setData(response.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const onDelete = async (drug) => {
    const config = {
      method: "post",
      url: "http://localhost:3031/deletedrug",
      headers: {
        authorization: isLoggedIn(),
      },
      data: { drug: drug, message: "delete drug" },
    };
    await axios(config)
      .then((response) => {
        console.log(response.data.message);
        setModalBody(response.data.message);
        setModalShow(true);
        getData()
      })
      .catch((err) => {
        // setModalBody(
        //   `Server error occured while attempting to delete ${drug}..`);
        // setModalShow(true);
        console.log(err);
        if (err.response.status === 401) {
          localStorage.removeItem("token");
          if (err.response.data && err.response.data.message && true) {
            setModalBody(err.response.data.message);
            setModalShow(true);
            setTimeout(() => {
              navigate("/login");
            }, 5000);
          }
        }
      });
  };

  return (
    <>
      <Container>
        <Modal show={modalShow} onHide={handleClose}>
          <Modal.Body>{modalBody}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <br />
        <Row>
          <Col>
            <Accordion className="list-sub-accord">
              {!data ? (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                data.map((drug) => {
                  // console.log(drug);
                  return (
                    <Accordion.Item eventKey={drug.name}>
                      <Accordion.Header>{drug.name}</Accordion.Header>
                      <Accordion.Body>
                        <ListGroup>
                          <ListGroup.Item>
                            <span className="data-spec">
                              subtype: {drug.subtype}
                            </span>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <span className="data-spec">categories:</span>{" "}
                            <span className="drugCategories">
                              {" "}
                              {drug.category.map((category) => {
                                return `${category}; `;
                              })}
                            </span>
                          </ListGroup.Item>
                          <ListGroup.Item className="blue-glow">
                            <Tabs
                              defaultActiveKey="home"
                              id="uncontrolled-tab-example"
                              className="mb-3"
                            >
                              <Tab eventKey="home" title="Activity">
                                <span className="data-spec white">agonism</span>
                                <Table
                                  striped
                                  bordered
                                  hover
                                  size="sm"
                                  className="list-tab"
                                >
                                  <thead>
                                    <tr>
                                      <th>
                                        <span className="data-spec white">
                                          target
                                        </span>
                                      </th>
                                      <th>
                                        <span className="data-spec white">
                                          affinity
                                        </span>
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {drug.agonist.map((agonist) => {
                                      return (
                                        <tr>
                                          <td className="white">
                                            <span className="white">
                                              {agonist}
                                            </span>
                                          </td>{" "}
                                          <td className="white">
                                            <span className="white">
                                              {drug.affinities ? (
                                                drug.affinities["agonist"][
                                                  agonist
                                                ]
                                              ) : (
                                                <span className="data-spec">
                                                  not specified
                                                </span>
                                              )}
                                            </span>
                                          </td>{" "}
                                        </tr>
                                      );
                                    })}{" "}
                                  </tbody>
                                </Table>

                                <span className="data-spec white">
                                  antagonism
                                </span>
                                <Table
                                  striped
                                  bordered
                                  hover
                                  size="sm"
                                  className="list-tab"
                                >
                                  <thead>
                                    <tr>
                                      <th>
                                        <span className="data-spec white">
                                          target
                                        </span>
                                      </th>
                                      <th>
                                        <span className="data-spec white">
                                          affinity
                                        </span>
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {drug.antagonist.map((antagonist) => {
                                      return (
                                        <tr>
                                          <td className="white">
                                            <span className="white">
                                              {antagonist}
                                            </span>
                                          </td>{" "}
                                          <td className="white">
                                            <span className="white">
                                              {drug.affinities ? (
                                                drug.affinities["antagonist"][
                                                  antagonist
                                                ]
                                              ) : (
                                                <span className="data-spec">
                                                  not specified
                                                </span>
                                              )}
                                            </span>
                                          </td>{" "}
                                        </tr>
                                      );
                                    })}{" "}
                                  </tbody>
                                </Table>
                              </Tab>
                              <Tab
                                eventKey="mech"
                                title="Mechanisms"
                                className="blue-glow"
                              >
                                <Table
                                  striped
                                  bordered
                                  hover
                                  size="sm"
                                  className="list-tab"
                                >
                                  <thead>
                                    <tr>
                                      <th>
                                        <span className="data-spec white">
                                          action
                                        </span>
                                      </th>
                                      <th>
                                        <span className="data-spec white">
                                          target
                                        </span>
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {drug.moa.map((moa) => {
                                      return (
                                        <tr>
                                          <td className="white">
                                            <span className="white">
                                              {moa.name}
                                            </span>
                                          </td>{" "}
                                          <td className="white">
                                            <span className="white">
                                              <span className="data-spec">
                                                {moa.target}
                                              </span>
                                            </span>
                                          </td>{" "}
                                        </tr>
                                      );
                                    })}{" "}
                                  </tbody>
                                </Table>
                              </Tab>
                              {isLoggedIn() && (
                                <Tab eventKey="profile" title="Configure">
                                  <Button
                                    variant={"outline-primary"}
                                    onClick={(e) => onDelete(drug.name)}
                                  >
                                    <Trash color="#0d6efd" size={25} /> delete
                                  </Button>
                                </Tab>
                              )}
                            </Tabs>
                          </ListGroup.Item>
                        </ListGroup>
                      </Accordion.Body>
                    </Accordion.Item>
                  );
                })
              )}
            </Accordion>
          </Col>
          {/* <Col> </Col> */}
        </Row>
      </Container>
    </>
  );
}
