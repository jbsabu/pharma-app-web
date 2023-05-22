import { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

const step = 100;
const images = {};
const seq = "/images/";

export default function Home() {
  const formatNum = (num) => {
    const len = String.toString(num);
    let str = `${num}`;

    for (let i = 0; str.length <= 3; i++) {
      str = `0${str}`;
    }

    return str;
  };
  const [imgStyle, setImgStyle] = useState({
    filter: `hue-rotate(${0}deg) blur(${0}px)`,
    backgroundPosition: `${1000}px`,
  });
  const [headerText, setHeaderText] = useState((<><span>P</span><span>I</span></>));
  const setHeader = (text) => {
    setHeaderText(text);
  };

  const [className,setClassName] = useState('invisible');

  function trackScrollPosition() {
    const y = window.scrollY;
    // console.log(y);
    const style = {
      //   backgroundImage: `url(${imageToUse})`,
      //   backgroundSize: "cover",
      //   mixBlendMode: "none",
      filter: `hue-rotate(${y / 2}deg) blur(${y * 0.00001}px)`,
      backgroundPosition: `${1000 + y / 10}px`,
    };
    if (y > 500) {
        setClassName('home-text');
    } else {
        setClassName('invisible');
    }
    setImgStyle(style);

    // console.log(style);
    // const canvas = document.getElementById("canvas");
    // const ctx = canvas.getContext("2d");
    // ctx.fillRect(5, 5, 90, 10);
    // // console.log(images[imageToUse],images,imageToUse);
    // const image = images[imageToUse];
    // // image.src =
    // //   imageToUse;
    // image.onload = imageLoaded;

    // function imageLoaded() {
    //   ctx.drawImage(image, 0, 0, 8000, 8000);
    // }
  }
  window.addEventListener("scroll", trackScrollPosition);

  return (
    <div className="hero-con">
      <div className="hero" style={imgStyle}>
        <h1
          id="canvas"
          className="text-dif main-header"
          onMouseEnter={(e) => {
            setHeader("Psychopharmacology-Index");
          }}
          onMouseLeave={(e) => {
            setHeader((<><span className="p">P</span><span className="i">I</span></>));
          }}
        >
          {headerText}
        </h1>
        <Container>
          <Row>
            <Col>
              {/* <canvas ref={images[1]} height={100} width={100} /> */}

              {/* <canvas ref={images[1]} height={8000} width={8000} id='canvas'/> */}

              <p className="home-text">
                Image courtesy of the Human Connectome Project, WU-Minn
                Consortium (Principal Investigators: David Van Essen and Kamil
                Ugurbil; 1U54MH091657) funded by the 16 NIH Institutes and
                Centers that support the NIH Blueprint for Neuroscience
                Research; and by the McDonnell Center for Systems Neuroscience
                at Washington University. https://www.humanconnectome.org/
              </p>
            </Col>
          </Row>
        </Container>
        <div className="hero-desc">
        <Container>
            <br />
        <p className={className}>
          This project serves as an impartial and neutral resource, providing
          informative insights into the effects of both pharmaceutical and
          non-pharmaceutical substances on the brain. By leveraging drug
          receptor data, it facilitates the analysis of drug-receptor
          interactions across a wide range of compounds. This project aims to
          allow a deeper understanding of the potential responses
          that different drugs may elicit. Expand your knowledge of
          psychopharmacology and its implications, empowering you with valuable
          insights for informed decision-making.
        </p>
        </Container>
      </div>
      </div>

    
    </div>
  );
}
