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

export default function DrugData({selectedDrugs,drugList}) {    


return (
    <Tab.Content>
    {Object.keys(selectedDrugs).map((drug, i) => {
      return (
        <Tab.Pane eventKey={`#${drug}`} className="drug-spec-data">
          <div className="drugName"> {drugList[drug].name}</div>
          <hr
            style={{
              width: "50%",
              padding: "-5px",
              textAlign: "left",
              marginLeft: 0,
            }}
          />
          <div className="drugSubtype">
            <span className="data-spec">subtype</span> <br />
            {drugList[drug].subtype.toLowerCase()}
          </div>

          <hr
            style={{
              width: "50%",
              padding: "-5px",
              textAlign: "left",
              marginLeft: 0,
            }}
          />
          <div className="drugCategories">
            <span className="data-spec">categories</span> <br />
            {drugList[drug].category.map((cat) => ` ${cat};`)}
          </div>
          <hr
            style={{
              width: "50%",
              padding: "-5px",
              textAlign: "left",
              marginLeft: 0,
            }}
          />
          <div className="drugActivity">
            <span className="data-spec">activity</span> <br />
            <Accordion  flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header className="!!!!!!">Agonism</Accordion.Header>
                <Accordion.Body>
                  {drugList[drug].agonist.map((cat) => `${cat}${drugList[drug]['affinities'] ?`: ${drugList[drug]['affinities']['agonist'][cat]}`:""}; `)}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1" sm={3}> 
                <Accordion.Header>Antagonism</Accordion.Header>
                <Accordion.Body>
                  {drugList[drug].antagonist.map(
                    (cat) => ` ${cat};`
                  )}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
          <hr
            style={{
              width: "50%",
              padding: "-5px",
              textAlign: "left",
              marginLeft: 0,
            }}
          />
          <div className="drugCategories">
            <span className="data-spec">mechanism of action</span>
            {"v"} <br />
            {drugList[drug].moa.map((moa) => (
              <span>
                
                <span className="data-spec">action</span> {">"}&nbsp;
                {moa.name.toLowerCase()}
                <br /> <span className="data-spec">
                  target&nbsp;
                </span>
                {">"}&nbsp;{moa.target.toLowerCase()} <br />
                <hr
                  style={{
                    width: "50%",
                    padding: "-5px",
                    textAlign: "left",
                    marginLeft: 0,
                  }}
                />
              </span>
            ))}
          </div>
        </Tab.Pane>
      );
    })}
  </Tab.Content>
)
}