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

export default function Analyze() {
  const [selected, setSelected] = useState([]);
  const [drugs, setDrugs] = useState([]);
  const [drugList, setDrugList] = useState([]);
  const [selectedDrugsElements, setSelectedDrugsElements] = useState([]); //
  const [selectedDrugs, setSelectedDrugs] = useState({}); // for the list of drugs that are selected
  const [stackReceptors, setStackReceptors] = useState({});
  const [stackAnalysis, setStackAnalysis] = useState([]);

  useEffect(() => {
    getData().then((data) => console.log(data));
  }, []);

  useEffect(() => {
    console.log("??????!!!! ")
    // setStackAnalysis(
    //   <StackAnalysis  selectedDrugs={selectedDrugs} drugList={drugList} stackReceptors={stackReceptors} />)
  }, [stackReceptors,selectedDrugs,drugList]);

  const updateReceptorData = () => {
    const receptors = stackReceptors;
    Object.keys(selectedDrugs).map((drug, i) => {
      selectedDrugs[drug].agonist.forEach((agonist) => {
        if (!receptors[agonist]) {
          receptors[agonist] = { agonism: 1, antagonism: 0 };
        } else {
          receptors[agonist].agonism++;
          if (receptors[agonist].antagonism > 0) receptors[agonist].warning= "agonist+antagonist";
        }
      } )
      selectedDrugs[drug].antagonist.forEach((antagonist) => {
        if (!receptors[antagonist]) {
          receptors[antagonist] = { agonism: 0, antagonism: 1 };
        } else {
          receptors[antagonist].antagonism++;
          if (receptors[antagonist].agonism > 0) receptors[antagonist].warning= "agonist+antagonist";
        }
      })
     
    });
    setStackReceptors(receptors);
   console.log(stackAnalysis)

  };

  const onDrugInputSelected = (e) => {
    const selDrugsRef = selectedDrugs;
    if (!e[0]) return;
    selDrugsRef[e[0].name] = e[0];
    setSelectedDrugs(selDrugsRef);
    console.log(e);
    setSelected("")
    setSelectedDrugsElements(
      Object.keys(selectedDrugs).map((drug, i) => {
        console.log(drug);
        return (
          <ListGroup.Item action href={`#${drug}`} sm={9} className="drug-lg" flush>
            {drugList[drug].name}
          </ListGroup.Item>
        );
      })
    );

      updateReceptorData();
  };

  const drugTypeAhead = () => {
    return (
      <>
        <Typeahead
          sm={12}
          id="floating-label"
          // onChange={onDrugInputChange}
          onInputChange={(e) => console.log("?", e)}
          onChange={(e) => onDrugInputSelected(e)}
          options={drugs}
          value={"selected"}
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
                >
                  <Form.Control
                    className="drug-input"
                    value={"selected"}
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
    const config = {
      url: "http://localhost:3031/getdrugs",
    };
    await axios(config).then((result) => {
      let labeledData = [];
      const listData = [];
      console.log(result);

      labeledData = result.data.map((drug, i) => {
        drug["label"] = drug.name;
        listData[drug.name] = drug;
        return drug;
      });
      setDrugs(labeledData);
      setDrugList(listData);
      console.log(listData);
    });
  };
  return (
    <>
    
      <Container className="ana-container">
        <Row className="ana-container">
          <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
            <Col className="c-1 ana-col">
              <Row>{drugTypeAhead()}</Row>
              <Row>
                {" "}
                <Row>
                  <Col sm={12}>
                    <ListGroup className="drug-list">{selectedDrugsElements}</ListGroup>
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
        
           <StackAnalysis  selectedDrugs={selectedDrugs} drugList={drugList} stackReceptors={stackReceptors} /></Col>

              {/* <Col className="c-4 ana-col">3 of 4</Col> */}
        </Row>
      </Container>
    </>
  );
} 
