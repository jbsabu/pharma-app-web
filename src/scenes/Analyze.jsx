import {
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Tab,
  ListGroup,
  Sonnet,
  Accordion,
  Button,
  Tabs,
} from "react-bootstrap";
import {
  Highlighter,
  Hint,
  Menu,
  MenuItem,
  Typeahead,
} from "react-bootstrap-typeahead"; // ES2015
import "react-bootstrap-typeahead/css/Typeahead.css";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import DrugData from "../components/DrugData";
import StackAnalysis from "../components/StackAnalysis";
import { Trash } from "react-bootstrap-icons";
import StackInteractions from "../components/StackInteractions";

export default function Analyze() {
  const [selected, setSelected] = useState([]);
  const [drugs, setDrugs] = useState([]);
  const [drugList, setDrugList] = useState([]);
  const [selectedDrugsElements, setSelectedDrugsElements] = useState([]); //
  const [selectedDrugs, setSelectedDrugs] = useState({}); // for the list of drugs that are selected
  const [stackReceptors, setStackReceptors] = useState({});
  const [stackAnalysis, setStackAnalysis] = useState([]);
  const [changed, setChanged] = useState(0);
  const [effects, setEffects] = useState([]);

  const [receptors, setReceptors] = useState([]);
  const getReceptorData = async () => {
    const config = {
      method: "get",
      url: "http://localhost:3031/getreceptors",
    };
    await axios(config)
      .then((result) => {
        // console.log(result.data);
        const receptorsFormatted = [];
        result.data.map((receptor, i) => {
          receptorsFormatted[receptor.name] = receptor;
          return receptor;
        });
        setReceptors(receptorsFormatted);
        // console.log(receptorsFormatted);
      })
      .catch(console.log);
  };

  useEffect(() => {
    getData().then((data) => console.log(data));
    getReceptorData();
  }, []);

  useEffect(() => {
    console.log("??????!!!! ");
    setStackAnalysis([
      <StackAnalysis
        selectedDrugs={selectedDrugs}
        drugList={drugList}
        stackReceptors={stackReceptors}
        receptors={receptors}
        key={Math.random() * 10000}
        setEffects={setEffects}
        effects={effects}
      />,
    ]);

    console.log("FUCKKKKKKJKk", selectedDrugs);
  }, [stackReceptors, selectedDrugs, drugList, changed]);

  const createSelectedDrugsElements = () => {
    console.log(selectedDrugs)
    setSelectedDrugsElements(
      Object.keys(selectedDrugs).map((drug, i) => {
        // console.log(drug);
        return (
          <ListGroup.Item
            action
            href={`#${drug}`}
            sm={9}
            className="drug-lg"
            flush
          >
            <Button
              variant={"outline-primary"}
              onClick={() => {
                console.log("?????? delete?????");
                setSelectedDrugsElements((oldElements) => {
                  oldElements[i] = null;
                  return [...oldElements];
                });
                setSelectedDrugs((oldDrugs) => {
                  delete oldDrugs[drug];
                  console.log(oldDrugs);
                  return oldDrugs;
                });

                setChanged((val) => val + 1);
              }}
            >
              <Trash />
            </Button>{" "}
            &nbsp;
            {drugList[drug].name}
          </ListGroup.Item>
        );
      })
    );
  };

  const onDrugInputSelected = (e) => {
    const selDrugsRef = selectedDrugs;
    if (!e[0]) return;
    selDrugsRef[e[0].name] = e[0];
    setSelectedDrugs(selDrugsRef);
    // console.log(e);
    // setSelected("")
    createSelectedDrugsElements();
    setChanged((val) => val + 1);
    // updateReceptorData();
  };

  const drugTypeAhead = () => {
    return (
      <>
        <Typeahead
          sm={12}
          id="floating-label"
          // onChange={onDrugInputChange}
          // onInputChange={(e) => console.log("?", e)}
          onChange={(e) => onDrugInputSelected(e)}
          options={drugs}
          value={selected}
          placeholder="Add drug..."
          className="drug-typeahead"
          // allowNew = {false}

          renderInput={({ inputRef, referenceElementRef, ...inputProps }) => {
            return (
              <Hint>
                <FloatingLabel
                  className="drug-label-ph"
                  controlId="floatingLabel"
                  label="Choose Substance"
                  value={selected}
                >
                  <Form.Control
                    className="drug-input"
                    value={"asdiashdioashdoashdasd"}
                    {...inputProps}
                    ref={(node) => {
                      inputRef(node);
                      referenceElementRef(node);
                    }}
                  />
                </FloatingLabel>
              </Hint>
            );
          }}
          selected={selected}
        />
      </>
    );
  };
  const getData = async () => {
    getReceptorData();
    const config = {
      url: "http://localhost:3031/getdrugs",
    };
    await axios(config).then((result) => {
      let labeledData = [];
      const listData = [];
      // console.log(result);

      labeledData = result.data.map((drug, i) => {
        drug["label"] = drug.name;
        listData[drug.name] = drug;
        return drug;
      });
      setDrugs(labeledData);
      setDrugList(listData);
      // console.log(listData);
    });
  };
  return (
    <>
      <Container className="ana-container">
        <Row className="ana-container">
          <Tab.Container id="list-group-tabs" defaultActiveKey="#link1">
            <Col className="c-1 ana-col">
              <Row>{drugTypeAhead()}</Row>
              <Row>
                {" "}
                <Row>
                  <Col sm={12}>
                    <ListGroup className="drug-list">
                      {selectedDrugsElements}
                    </ListGroup>
                  </Col>

                  <Col sm={8}></Col>
                </Row>
              </Row>
            </Col>

            <Col className="c-2 ana-col">
              {" "}
              <DrugData selectedDrugs={selectedDrugs} drugList={drugList} />
            </Col>
          </Tab.Container>
          <Col className="c-3 ana-col">
            {" "}
            <Tabs
              defaultActiveKey="home"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab 
                eventKey="home"
                title={
                  <span>
                    {" "}
                    <span className="blue-glow-sub">
                      Targets <span className="addition">+</span> Responses
                      </span>
                  </span>
                }
              >
                {stackAnalysis}
              </Tab>
              <Tab eventKey="interactions" title={ <span className="blue-glow-sub">Interactions</span>}> <StackInteractions drugs={selectedDrugs} responses = {effects}/></Tab>
            
            </Tabs>
          </Col>
          {changed}
          {/* <Col className="c-4 ana-col">3 of 4</Col> */}
        </Row>
      </Container>
    </>
  );
}
