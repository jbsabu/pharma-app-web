import { Container, Nav, Navbar,Image } from "react-bootstrap";
import image from '../logo.png'
import { useNavigate } from "react-router-dom";



export default function Header ( ) {
  const navigate = useNavigate()
  const OnClick = (e)=>{
  // useNavigate(e.target.value)
  navigate(e.target.id)
  }
  return (
  <>
       <Navbar bg="light" variant="light">
        <Container>
          {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
            <Navbar.Brand ><Image className="logo-img" src = {image}  fluid/> </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="" id = '/analyze' onClick={OnClick}>Analyze</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  </>
  )
}