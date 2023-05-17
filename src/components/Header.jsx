import { Container, Nav, Navbar,Image } from "react-bootstrap";
import image from '../logo.png'
import { useNavigate } from "react-router-dom";



export default function Header ( ) {
  const navigate = useNavigate()
  const OnClick = (e)=>{
  // useNavigate(e.target.value)
  navigate(e.target.id)
  }
  //      <Nav.Link href="/adddrug">New Substance</Nav.Link>
  return (
  <>
       <Navbar variant="light" className="bar">
        <Container>
          {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
            <Navbar.Brand ><Image className="logo-img" src = {image}  fluid/> </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="" id = '/analyze' onClick={OnClick}>Analyze</Nav.Link>
      
          </Nav>
          <Nav className="me-auto">
          <Nav.Link href="/adddrug"><span className="addition">+</span> Substance</Nav.Link>
          <Nav.Link href="/addreceptor"><span className="addition">+</span> Receptor</Nav.Link>
            <Nav.Link href="/login">Login&nbsp; Register</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  </>
  )
}