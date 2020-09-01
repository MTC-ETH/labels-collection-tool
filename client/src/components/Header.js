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
