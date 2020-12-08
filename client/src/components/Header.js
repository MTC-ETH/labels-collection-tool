// Copyright 2020-2021, ETH Zurich, Media Technology Center
//
// This file is part of Labels Collection Tool (LCT) at MTC, in the scope of the project
// Emotion and Stance detection for German text.
//
// Labels Collection Tool (LCT) is a free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Labels Collection Tool (LCT) is distributed in the hope that it will be useful for similar projects,
// but Labels Collection Tool (LCT); without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser Public License for more details.
//
// You should have received a copy of the GNU Lesser Public License
// along with Labels Collection Tool (LCT). If not, see <https://www.gnu.org/licenses/>.

import React from "react";

import {
    Col,
    Collapse,
    Container,
    Nav,
    Navbar,
    NavbarBrand, NavbarText,
    NavbarToggler,
    NavItem,
    NavLink,
    Row
} from "reactstrap";

class NavItemSelectable extends React.Component {
    static defaultProps = {
        selectedPage: "/",
        pageName: "",
    };

    render() {
        const style = {};
        const isSelected = this.props.selectedPage === this.props.pageName;
        if(isSelected) {
            style.color = "black";
            style.textDecoration = "underline";
        }
        return <NavItem>
            <NavLink style={style} href={"/" + this.props.pageName}>
                {this.props.children}
            </NavLink>
        </NavItem>;
    }
}

class Header extends React.Component {

    static defaultProps = {
        selectedPage: "/"
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            isOpen: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({isOpen: !this.state.isOpen})
    }

    render() {
      return (
          <>
              <div style={{background: "#ededed"}}>
              </div>
              <div>
                  <Navbar color="light" light expand="lg" className={"mb-3"}>
                      <Container>

                          <NavbarBrand href="/">
                              <Container>
                                  <Row>
                                      <Col className={"p-0"}>
                                          <img
                                              alt="MTC"
                                              style={{height: "100%", maxHeight: 38}}
                                              src={require("../assets/imgs/MTCLogoHigher.png")}
                                          />
                                      </Col>
                                      <Col className={"p-0 pl-3"}>
                                          <div style={{textAlign: "center", fontSize: 17, lineHeight: "120%"}}>
                                              <b>Emotion<br/>& Stance</b>
                                          </div>
                                      </Col>
                                  </Row>
                              </Container>
                          </NavbarBrand>
                          <NavbarToggler onClick={this.toggle}/>
                          <Collapse isOpen={this.state.isOpen} navbar>
                              <Nav className="mr-auto" navbar>
                                  <NavItemSelectable selectedPage={this.props.selectedPage} pageName={"instructions"}>
                                      Anleitungen
                                  </NavItemSelectable>
                                  <NavItemSelectable selectedPage={this.props.selectedPage} pageName={"labelling"}>
                                      Beschriftung
                                  </NavItemSelectable>
                                  <NavItemSelectable selectedPage={this.props.selectedPage} pageName={"personalpage"}>
                                      Persönliche Seite
                                  </NavItemSelectable>
                                  <NavItemSelectable selectedPage={this.props.selectedPage} pageName={"authenticatelabeller"}>
                                      Authentifizierung
                                  </NavItemSelectable>
                              </Nav>
                              <NavbarText><img
                                  alt="ETH"
                                  style={{height: "100%", maxHeight: 38, opacity: "70%"}}
                                  src={require("../assets/imgs/ETHLogoHigher.png")}
                              /></NavbarText>
                          </Collapse>
                      </Container>
                  </Navbar>
              </div>
          </>
    );
  }
}

export default Header;
