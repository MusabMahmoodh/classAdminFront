import React from 'react'
import { Navbar,Nav } from 'react-bootstrap'
import {sidebarItems} from '../../lists/list'
import { withRouter } from "react-router-dom";
import AuthOptions from '../auth/AuthOptions'
function Header(props) {
  const { history } = props;
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="mb-3">
  <Navbar.Brand onClick={() => history.push("/")}>ProgressBook</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      {sidebarItems.map((item,index) =>(
          <Nav.Link key={index} onClick={() => history.push(item.path)}>
      
              {item.name}
          </Nav.Link>
      ))}
    </Nav>
    <Nav>
      <Nav.Link href="#deets">More deets</Nav.Link>
      <Nav.Link >
      <AuthOptions />
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
  )
}

export default withRouter(Header)
