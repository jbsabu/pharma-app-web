import {
  Container,
  Nav,
  Navbar,
  Image,
  Dropdown,
  NavLink,
  NavItem,
} from "react-bootstrap";
import image from "../logo.png";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const OnClick = (e) => {
    // useNavigate(e.target.value)
    navigate(e.target.id);
  };
  //      <Nav.Link href="/adddrug">New Substance</Nav.Link>
  return (
    <>
      <Navbar variant="light" className="bar justify-content-center">
        {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
        <Nav className="me-auto justify-content-center">
          <Image className="logo-img" src={image} fluid />
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="" id="/analyze" onClick={OnClick}>
            Analyze
          </Nav.Link>

          {/* </Nav> */}
          {/* <Nav className="me-auto"> */}

          <Nav.Link href="/addreceptor"></Nav.Link>
          <Nav.Link href="/login">Admin Login&nbsp;</Nav.Link>
          <Dropdown as={NavItem}>
            <Dropdown.Toggle as={NavLink}>Substances</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                {" "}
                <Nav.Link href="/adddrug">
                  <Link to="/adddrug">
                    <span className="addition">+</span> Substance
                  </Link>
                </Nav.Link>
              </Dropdown.Item>
              <Dropdown.Item>
                {" "}
                <Nav.Link href="/druglist">
                  <Link to="/druglist">
                    <span className="addition">+</span> List
                  </Link>
                </Nav.Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar>
    </>
  );
}
