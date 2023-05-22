import { useEffect, useState } from "react";
import { Accordion, ListGroup, Table } from "react-bootstrap";
import {
  ExclamationOctagon,
  ExclamationDiamond,
  QuestionOctagon,
} from "react-bootstrap-icons";

export default function StackInteractions({ drugs, responses }) {
  useEffect(() => {
    console.log(drugs, responses);
    findInteractions();
  }, [drugs, responses]);
  const [interactions, setInteractions] = useState();
  const [interactionElements, setInteractionElements] = useState();

  const createInteractionElements = (interactions) => {
    const elements = [];
    interactions.map((interaction, i) => {
      const dangerClass = `danger-${interaction.severity}`;
      const severityElement =
        interaction.severity >= 4 ? (
          <ExclamationOctagon
            fill="red"
            color="red"
            className={`danger-${interaction.severity}`}
          />
        ) : interaction.severity >= 3 ? (
          <ExclamationDiamond className={`danger-${interaction.severity}`} />
        ) : (
          <QuestionOctagon className={`danger-${interaction.severity}`} />
        );
      elements.push(
        <Accordion.Item
          eventKey={i}
          className={`border-${interaction.severity} border-none`}
        >
          <Accordion.Header>
            <span className={`data-spec border-none`}>
              {interaction.label_a} + {interaction.label_b}
            </span>
            &nbsp;{severityElement}
          </Accordion.Header>
          <Accordion.Body className="!!!!!">
            <ListGroup>
              <ListGroup.Item className={`border-${interaction.severity}`}>
                <span className={dangerClass}>{interaction.interaction}</span>
              </ListGroup.Item>
              <ListGroup.Item className={`border-${interaction.severity}`}>
                <Table striped hover>
                  <thead>
                    <tr>
                      <th className="white data-spec">{interaction.label_a}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {interaction[interaction.label_a].map((drug) => {
                      return (
                        <tr>
                          <td className="white data-spec data-table">
                            <span className="difference">{drug}</span>
                          </td>{" "}
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </ListGroup.Item>
              <ListGroup.Item className={`border-${interaction.severity}`}>
                <Table striped hover>
                  <thead>
                    <tr>
                      <th className="white data-spec">{interaction.label_b}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {interaction[interaction.label_b].map((drug) => {
                      return (
                        <tr>
                          <td className="white data-spec data-table">
                            <span className="difference">{drug}</span>
                          </td>{" "}
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </ListGroup.Item>
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
      );
    });
    setInteractionElements(elements);
  };

  const findInteractions = () => {
    const labels = {};
    function hasSpace(sentence) {
      return sentence.indexOf(" ") >= 0;
    }
    const getStrings = (drugCategories, drugName) => {
      const keywords = [
        " ",
        "stimulant",
        "maoi",
        "antipsychotic",
        "recreational",
        "sedative",
        "ssri",
        "opioid",
        "serotonin releaser"
      ];
      const keywordsIncludes = (category) => {
        let { word, index } = [null, null];
        keywords.forEach((keyword, i) => {
          if (category.toLowerCase().search(keyword) >= 0) {
            word = keyword;
            index = i;
            return;
          }
        });
        return word && index ? { word, index } : false;
      };
      drugCategories.forEach((category) => {
        const { word, index } = keywordsIncludes(category);
        if (word) {
          if (labels[word]) {
            labels[word][drugName.toLowerCase()] = true;
          } else {
            labels[word] = { [drugName.toLowerCase()]: true };
          }
        } else {
          if (!hasSpace(category)) {
            if (labels[category]) {
              labels[category.toLowerCase()][drugName.toLowerCase()] = true;
            } else {
              labels[category.toLowerCase()] = {
                [drugName.toLowerCase()]: true,
              };
            }
          }
        }
      });
    };
    const interactions = {
      //['maoi', 'stimulant'], ['maoi','ssri']
      ['serotonin releaser']: {
        ssri: "!!!!!#Combining SSRIs & potent serotonin releasers will likely cause serotonin syndrome which can be life threatening@serotonin_syndrome",
        psychedelic: "!!#Serotonin releasers may potentiate psychedelics",
        maoi: "!!!!#MAOIs can increase the potency of certain serotonin releasers to extremely dangerous levels and is likely to cause serotonin syndrome which can be life threatening@serotonin_syndrome",
      },
      maoi: {
        stimulant:
          "!!!!#MAOIs can increase the potency of certain stimulants to dangerous levels and may cause serotonin syndrome which can be life threatening@serotonin_syndrome",
        ssri: "!!!!!#Combining MAOIs & SSRIs may cause serotonin syndrome which can be life threatening@serotonin_syndrome",
        psychedelic: "!!#MAOIs may increase the potency of psychedelics",
      },
      stimulant: {
        ssri: "!#Combining certain stimulants & SSRIs may cause serotonin syndrome@serotonin_syndrome",
        psychedelic:
          "!!#Stimulants may increase the potency & unpredictability of psychedelics",
        sedative:
          "!!!#Combining stimulants & sedatives/depressants may increase strain on the heart and raise the risk for cardiovascular disease",
        opioid:
          "!!!!!#Combining stimulants & opioids increases can lead to an increased risk of respiratory depression, cardiovascular complications, and overdose@respiratory_depression",
      },
      ssri: {},
      opioid: {
        sedative:
          "!!!!!#Combining opioids & sedatives increases the risk of respiratory depression & overdose@respiratory_depression",
      },
    };
    const interactionsFound = [];
    Object.keys(drugs).forEach((drug) => {
      console.log("?!!!!!!");
      getStrings([...drugs[drug].category, drugs[drug].subtype], drug);
    });

    console.log(labels);
    Object.keys(labels).forEach((label) => {
      console.log("!!!!");
      if (interactions[label]) {
        Object.keys(interactions[label]).forEach((subLabel) => {
          //interactionsFound.push({drugs: Object.keys(labels[label]), interaction: interactions[label], label});
          if (labels[subLabel]) {
            const labelDrugs = Object.keys(labels[label]);
            const subLabelDrugs = Object.keys(labels[subLabel]);
            if (
              !(
                labelDrugs.length === 1 &&
                subLabelDrugs.length === 1 &&
                labelDrugs[0] === subLabelDrugs[0]
              )
            ) {
              if (drugs[label] & ["affinities"]) {
              }
              const interactionSeverity =
                interactions[label][subLabel].indexOf("#");
              let interactionFormatted = interactions[label][subLabel].slice(
                interactionSeverity + 1
              );
              let interactionKeyword =
                interactions[label][subLabel].indexOf("@");
              if (interactionKeyword >= 0) {
                interactionFormatted = interactionFormatted.split("@")[0];
                interactionKeyword = interactions[label][subLabel].slice(
                  interactionKeyword + 1
                );
              } else {
                interactionKeyword = null;
              }
              interactionsFound.push({
                [label]: labelDrugs,
                [subLabel]: subLabelDrugs,
                interaction: interactionFormatted,
                severity: interactionSeverity,
                label_a: label,
                label_b: subLabel,
                keyword: interactionKeyword,
              });
            }
          }
        });
      }
    });
    console.log(interactionsFound);
    setInteractions(interactionsFound);
    createInteractionElements(interactionsFound);
  };

  return (
    <>
      <Accordion>
        {interactions ? interactionElements : "no interactions found"}
      </Accordion>
    </>
  );
}
