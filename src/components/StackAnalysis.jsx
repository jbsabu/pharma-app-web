import axios from "axios";
import { useEffect, useState } from "react";
import { Accordion, Col } from "react-bootstrap";

export default function StackAnalysis({
  selectedDrugs,
  drugList,
  stackReceptors,
}) {
  //   console.log("?dsfs", selectedDrugs, drugList, stackReceptors);
  const [receptors, setReceptors] = useState([]);
  const getReceptorData = async () => {
    const config = {
      method: "get",
      url: "http://localhost:3031/getreceptors",
    };
    await axios(config)
      .then((result) => {
        console.log(result.data);
        const receptorsFormatted = [];
        result.data.map((receptor, i) => {
          receptorsFormatted[receptor.name] = receptor;
          return receptor;
        });
        setReceptors(receptorsFormatted);
        console.log(receptorsFormatted);
      })
      .catch(console.log);
  };

  useEffect(() => {
    getReceptorData();
  }, []);

  const canRenderData = (receptor, category) => {
    if (receptors[receptor]) {
      return true;
    }
    return false;
  };

  const GetResponses = () => {
    const effects = {};
    effects["agonist"] = {};
    effects["antagonist"] = {};
    effects["moa"] = {};
    effects["moa"]["agonist"] = [];
    effects["moa"]["antagonist"] = [];
    Object.keys(stackReceptors).map((receptor) => {
      if (receptors[receptor]) {
        const curReceptor = receptors[receptor];
        const activityData = stackReceptors[receptor];
        // console.log(curReceptor);
        // console.log(activityData);
        // console.log(curReceptor);

        console.log(
          "?!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
          effects
        );
        if (activityData.agonism > 0 && activityData.antagonism > 0) {
          if (!curReceptor.effect.agonist["short_term"])
            console.log("no short term effects for ", curReceptor.name);
          Object.keys(curReceptor.effect.agonist["short_term"]).map(
            (effect) => {
              console.log("?!!!!", effects);
              if (curReceptor.moa.agonist[effect]) {
                const specificEffect = curReceptor.moa.agonist[effect];
                specificEffect["label"] = effect;
                specificEffect["receptor"] = curReceptor["name"];
                specificEffect["activity"] = "agonism";
                effects.moa.agonist.push(specificEffect);
              }
              if (![effects["agonist"][effect]]) {
                effects["agonist"][effect] =
                  curReceptor.effect.agonist["short_term"][effect];
              } else {
                effects["agonist"][effect] +=
                  curReceptor.effect.agonist["short_term"][effect];
              }
            }
          );
          Object.keys(curReceptor.effect.antagonist["short_term"]).map(
            (effect) => {
              console.log("?!!!!", effects);
              if (curReceptor.moa.antagonist[effect]) {
                const specificEffect = curReceptor.moa.antagonist[effect];
                specificEffect["label"] = effect;
                specificEffect["receptor"] = curReceptor["name"];
                specificEffect["activity"] = "antagonism";
                effects.moa.antagonist.push(specificEffect);
              }
              if (![effects["antagonist"][effect]]) {
                effects["antagonist"][effect] =
                  curReceptor.effect.antagonist["short_term"][effect];
              } else {
                effects["antagonist"][effect] +=
                  curReceptor.effect.antagonist["short_term"][effect];
              }
            }
          );
        } else if (activityData.agonism > 0) {
          Object.keys(curReceptor.effect.agonist["short_term"]).map(
            (effect) => {
              console.log("?!!!!", effects);
              if (curReceptor.moa.agonist[effect]) {
                const specificEffect = curReceptor.moa.agonist[effect];
                specificEffect["label"] = effect;
                specificEffect["receptor"] = curReceptor["name"];
                specificEffect["activity"] = "agonism";
                effects.moa.agonist.push(specificEffect);
              }
              if (!effects["agonist"][effect]) {
                effects["agonist"][effect] = 0;
                effects["agonist"][effect] =
                  curReceptor.effect.agonist["short_term"][effect];
              } else {
                effects["agonist"][effect] +=
                  curReceptor.effect.agonist["short_term"][effect];
              }
            }
          );
        } else if (activityData.antagonism > 0) {
          Object.keys(curReceptor.effect.antagonist["short_term"]).map(
            (effect) => {
              console.log("?!!!!", effects);
              if (curReceptor.moa.antagonist[effect]) {
                const specificEffect = curReceptor.moa.antagonist[effect];
                specificEffect["label"] = effect;
                specificEffect["receptor"] = curReceptor["name"];
                specificEffect["activity"] = "antagonism";
                effects.moa.antagonist.push(specificEffect);
              }
              if (!effects["antagonist"][effect]) {
                effects["antagonist"][effect] =
                  curReceptor.effect.antagonist["short_term"][effect];
              } else {
                effects["antagonist"][effect] +=
                  curReceptor.effect.antagonist["short_term"][effect];
              }
            }
          );
        }
      }
    });
    console.log(stackReceptors);
    console.log(effects);
    const effectCategories = {};

    const categorize = (effect) => {
      if (!effectCategories[effect.label]) {
        effectCategories[effect.label] = [];
      }
      effectCategories[effect.label].push(effect);
    };
    effects.moa.agonist.forEach((effect) => {
      categorize(effect);
    });
    effects.moa.antagonist.forEach((effect) => {
      categorize(effect);
    });
    console.log(effects, effectCategories);
    // return <>data here</>;
    const accordItems = []; // accordion items
    Object.keys(effectCategories).forEach((effect,i) => {
      accordItems[i]= (
        <Accordion.Item eventKey={effect}>
          {" "}
          <Accordion.Header> {effect} </Accordion.Header>{" "}
          <Accordion.Body>
            {" "}
            <Accordion flush>

            {effectCategories[effect].map((effect) => {
              return  <Accordion.Item  eventKey={effect.mechanism}>
                    <Accordion.Header><span className="data-spec resp-recep">{effect.receptor}   &nbsp;</span> <br /> predicted response:   <span className={effect.effect > 0 ? "ef-green" : "ef-red"}><br/> &nbsp; {effect.effect}</span> </Accordion.Header>{" "}
                    <Accordion.Body>
                        <span className="data-spec">receptor</span>{" "}
                        {effect.receptor} <br />
                        <span className="data-spec">activity</span>{" "}
                        {effect.activity} <br />
                        <span className="data-spec">mechanism</span>{" "}
                        {effect.mechanism} <br />
                  
                   </Accordion.Body>
                   </Accordion.Item>
            })}{" "}
            </Accordion>
          </Accordion.Body>{" "}
        </Accordion.Item>
      );
    });
    return  accordItems;
  };

  return (
    <>
      <Accordion flush>
        <Accordion.Item eventKey="targets">
          <Accordion.Header>
            {" "}
            <h3>targets</h3>{" "}
          </Accordion.Header>

          <Accordion.Body>
            {
              <Accordion flush>
                {Object.keys(stackReceptors).map((receptor) => {
                  return (
                    canRenderData(receptor) && (
                      <div className="drugCategories">
                        <Accordion.Item eventKey={receptor}>
                          <Accordion.Header>
                            {" "}
                            <span className="data-spec">
                              {receptor}
                            </span> <br />{" "}
                          </Accordion.Header>
                          <Accordion.Body>
                            <span className="data-spec">type</span>{" "}
                            {receptors[receptor].subtype}
                            <br /> <hr />
                            <span className="data-spec">locations:</span>{" "}
                            {receptors[receptor].location.map((loc) => {
                              return (
                                <>
                                  <br />
                                  {loc}{" "}
                                </>
                              );
                            })}
                            <br /> <hr />
                            <span className="data-spec sc">agonists:</span>{" "}
                            {stackReceptors[receptor].agonism}
                            <br />{" "}
                            <span className="data-spec pc">
                              antagonists:
                            </span>{" "}
                            {stackReceptors[receptor].antagonism}
                            <br />{" "}
                          </Accordion.Body>
                        </Accordion.Item>
                      </div>
                    )
                  );
                })}
              </Accordion>
            }
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="responses">
          <Accordion.Header>
            {" "}
            <h3>responses</h3>{" "}
          </Accordion.Header>
          <Accordion.Body>
            <Accordion>{GetResponses()}</Accordion>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>{" "}
    </>
  );
}
