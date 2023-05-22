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
import { isLoggedIn } from "../functions/authentication";

export default function Header() {
  const navigate = useNavigate();
  const OnClick = (e) => {
    // useNavigate(e.target.value)
    navigate(e.target.id);
  };


  //      <Nav.Link href="/adddrug">New Substance</Nav.Link>
  return (
    <>
      <Navbar variant="light" className="bar justify-content-center header">
        {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
        <Nav className="me-auto justify-content-center">
          <Image className="logo-img" src={image} fluid />
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="" id="/analyze" onClick={OnClick}>
            Analyze
          </Nav.Link>

          {/* </Nav> */}
          {/* <Nav className="me-auto"> */}

          <Nav.Link href="/addreceptor"></Nav.Link>
       
          <Dropdown as={NavItem}>
            <Dropdown.Toggle as={NavLink}>Substances</Dropdown.Toggle>
            <Dropdown.Menu>
              
                {" "}
              {isLoggedIn() &&
              <Dropdown.Item>
                <Nav.Link href="/adddrug">
                  <Link to="/adddrug">
                    <span className="addition">+</span> Substance
                  </Link>
                </Nav.Link>
              </Dropdown.Item>
            }
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
        <Dropdown as={NavItem}>
            <Dropdown.Toggle as={NavLink}>Admin</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                {" "}
                <Nav.Link href="/login">
                  <Link to="/login">
                    {localStorage.getItem("token") ?   (<Nav.Link href="/login" onClick={()=>{localStorage.removeItem('token')}}>Logout&nbsp;</Nav.Link>): ( <Nav.Link href="/login">Login&nbsp;</Nav.Link>)}
                      

                  </Link>
                </Nav.Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;

      </Navbar>
    </>
  );
}
