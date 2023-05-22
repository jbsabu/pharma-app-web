import axios from "axios";
import React, { useEffect, useState } from "react";
import { Accordion, Col } from "react-bootstrap";

export default function StackAnalysis({
  selectedDrugs,
  drugList,
  receptors,
  key,
  setEffects
}) {
  //   console.log("?dsfs", selectedDrugs, drugList, stackReceptors);

  const [responses, setResponses] = useState([]);
  const [receptorElements, setReceptorElements] = useState([]);
  const [stackReceptors, setStackReceptors] = useState({});

  useEffect(() => {
    // getReceptorData();
    // console.log(receptors);
    GetResponses();
    // updateReceptorData();
    setStackReceptors({});
    // console.log(selectedDrugs, stackReceptors);
  }, []);

  useEffect(() => {
    // getReceptorData();
    setStackReceptors({});
    GetResponses();
    updateReceptorData();
    // GetReceptorElements();

    // console.log(receptorElements, responses, selectedDrugs, stackReceptors);
  }, [selectedDrugs]);

  useEffect(() => {
    GetResponses();
  }, [stackReceptors]);

  const updateReceptorData = () => {
    // const receptors = stackReceptors;
    // console.log(receptors);
    // setStackReceptors((oldReceptors) => {
    //   Object.keys(selectedDrugs).map((drug, i) => {
    //     // console.log("!!!!", oldReceptors);
    //     selectedDrugs[drug].agonist.forEach((agonist) => {
    //       if (!oldReceptors[agonist]) {
    //         oldReceptors[agonist] = { agonism: 1, antagonism: 0 };
    //       } else {
    //         oldReceptors[agonist].agonism++;
    //         if (oldReceptors[agonist].antagonism > 0)
    //           oldReceptors[agonist].warning = "agonist+antagonist";
    //       }
    //     });
    //     selectedDrugs[drug].antagonist.forEach((antagonist) => {
    //       if (!oldReceptors[antagonist]) {
    //         oldReceptors[antagonist] = { agonism: 0, antagonism: 1 };
    //       } else {
    //         oldReceptors[antagonist].antagonism++;
    //         if (oldReceptors[antagonist].agonism > 0)
    //           oldReceptors[antagonist].warning = "agonist+antagonist";
    //       }
    //     });
    //   });
    //   return oldReceptors;
    // });
  
    // console.log(stackAnalysis);
    const oldReceptors = stackReceptors;
    Object.keys(selectedDrugs).map((drug, i) => {
      // console.log("!!!!", oldReceptors);
      // console.log("key!!!!!!",key,selectedDrugs, oldReceptors);
      selectedDrugs[drug].agonist.forEach((agonist) => {
        if (!oldReceptors[agonist]) {
          oldReceptors[agonist] = { agonism: 0, antagonism: 0,agonist:{},antagonist:{} };
        } else {
          oldReceptors[agonist].agonism++;
          oldReceptors[agonist].agonist[agonist] = true;
          if (oldReceptors[agonist].antagonism > 0) {
            oldReceptors[agonist].warning = "agonist+antagonist";
          }
        }
      });
      selectedDrugs[drug].antagonist.forEach((antagonist) => {
        if (!oldReceptors[antagonist]) {
          oldReceptors[antagonist] = { agonism: 0, antagonism: 0 ,agonist:{},antagonist:{[antagonist] : true}};
        } else {
          oldReceptors[antagonist].antagonism++;
          oldReceptors[antagonist].antagonist[antagonist] = true;
          if (oldReceptors[antagonist].agonism > 0) {
            oldReceptors[antagonist].warning = "agonist+antagonist";
          }
        }
      });
    });
    GetReceptorElements();
    // console.log(stackReceptors)
    setStackReceptors(oldReceptors);
  };
  const canRenderData = (receptor, category) => {
    // console.log(receptor, receptors);
    if (receptors[receptor]) {
      return true;
    }
    return false;
  };

  const GetReceptorElements = () => {
    console.log(stackReceptors,"ERR ERR ERR ERR ERRERR ERR ERR ERR ERRERR ERR ERR ERR ERRERR ERR ERR ERR ERRERR ERR ERR ERR ERRERR ERR ERR ERR ERRERR ERR ERR ERR ERRERR ERR ERR ERR ERR")
    const elements = [];
    {
      Object.keys(stackReceptors).map((receptor, i) => {
        console.log("ERR ERR ERR ERR ERR NOT NOT NOTRR ERR ERR NOT NOT NOTRR ERR ERR NOT NOT NOTRR ERR ERR NOT NOT NOT ")
        elements[i] = canRenderData(receptor) && (
          <div className="drugCategories">
            <Accordion.Item eventKey={receptor}>
              <Accordion.Header>
                {" "}
                <span className="data-spec">{receptor}</span> <br />{" "}
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
                <br /> <span className="data-spec pc">antagonists:</span>{" "}
                {stackReceptors[receptor].antagonism}
                <br />{" "}
              </Accordion.Body>
            </Accordion.Item>
          </div>
        );
      });
    }
    // console.log(
    //   "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
    //   elements
    // );
    setReceptorElements(elements);
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
              // console.log("?!!!!", effects);
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
                console.log("IS AG NAN!!!!!??????: ",isNaN(effects["agonist"][effect]))
                effects["agonist"][effect] +=
                  curReceptor.effect.agonist["short_term"][effect];
              }
            }
          );
        } else if (activityData.antagonism > 0) {
          Object.keys(curReceptor.effect.antagonist["short_term"]).map(
            (effect) => {
              // console.log("?!!!!", effects);
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
              if (  isNaN( effects["antagonist"][effect])) {console.log("!!!!!!!!!!!!!!!!!!!!!!! NOT A NUMBER !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")}
            }
          );
        }
      }
    });
    // console.log(stackReceptors);
    // console.log(effects);
    const effectCategories = {};
    console.log("??????????????????????????????????",effects)
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
    // console.log(effectCategories)
    setEffects(effectCategories)
    // console.log(effects, effectCategories);
    // return <>data here</>;


    const effectsTotal = {agonism: {}, antagonism: {}}
    const effectAntagonists = {}

    Object.keys(effectCategories).forEach((eff) => {
      const effect = effectCategories[eff]
     
      if (! effectsTotal[eff] ) {effectsTotal[eff] = 0}
      effectsTotal[eff] += effect[0].effect
      if (! effectsTotal['agonism'][eff] ) {  console.log(effect['activity']); effectsTotal['agonism'][eff] = {total: 0, count: 0}}
      if (! effectsTotal['antagonism'][eff] ) {  console.log(effect['activity']); effectsTotal['antagonism'][eff] = {total: 0, count: 0}}
      console.log(effect[0]['activity'],"qwerty!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
      effectsTotal[effect[0]['activity']][eff].total += effect[0].effect
      effectsTotal[effect[0]['activity']][eff].count += 1
    }

    )
    const accordItems = [];
    console.log("!!!!!!!!!!!",effects, effectCategories,receptors)
    Object.keys(effectCategories).forEach((effect, i) => {
      console.log("NAN NAN NAN NAN NAN NAN NAN NAN NAN NAN NAN  ",effects.antagonist[effect],isNaN(effects.antagonist[effect]),effect,effectsTotal)
      accordItems[i] = (
        <Accordion.Item eventKey={effect}>
          {" "}
          <Accordion.Header>
            {" "}
            {effect.replace("_", " ")}
            <>
            <span className="data-spec"> &nbsp;</span>
              <span className={"ef-green"}>
  
              </span>
              <span className={"ef-red"}>
                {" "}
                {((!isNaN(effectsTotal[effect])) ? effectsTotal[effect] : 0 )+0}

              </span>
            </>
          </Accordion.Header>{" "}
          <Accordion.Body >
            {" "}
            <Accordion flush>
              {effectCategories[effect].map((effect) => {
                return (
                  <Accordion.Item eventKey={effect.mechanism}>
                    <Accordion.Header>
                      <span className="data-spec resp-recep">
                        {effect.receptor} &nbsp;
                      </span>{" "}
                      <br /> predicted response:{" "}
                      <span
                        className={effect.effect > 0 ? "ef-green" : "ef-red"}
                      >
                        <br /> &nbsp;{" "}
                        {effect.effect > 0
                          ? `+${effect.effect}`
                          : effect.effect}
                      </span>{" "}
                    </Accordion.Header>{" "}
                    <Accordion.Body>
                      <span className="data-spec">receptor</span>{" "}
                      <span className="data-info">
                        {" "}
                        {effect.receptor} <br />{" "}
                      </span>
                      <span className="data-spec">activity</span>{" "}
                      <span className="data-info">
                        {effect.activity} <br />{" "}
                      </span>
                      <span className="data-spec">mechanism</span>{" "}
                      <span className="data-info">
                        {" "}
                        {effect.mechanism} <br />{" "}
                      </span>
                    </Accordion.Body>
                  </Accordion.Item>
                );
              })}{" "}
            </Accordion>
          </Accordion.Body>{" "}
        </Accordion.Item>
      );
    });
    setResponses(accordItems);
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
            <Accordion flush>{receptorElements}</Accordion>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="responses">
          <Accordion.Header>
            {" "}
            <h3>responses</h3>{" "}
          </Accordion.Header>
          <Accordion.Body>
            <Accordion>{responses}</Accordion>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>{" "}
    </>
  );
}
