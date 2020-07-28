import React from "react";

// reactstrap components
import {Col, Container, Media, Row} from "reactstrap";
import headerImg from "../assets/imgs/ETHMTCHeader.png";

class Header extends React.Component {

  render() {
      return (
          <div style={{background: "#ededed"}}>
          <Container className={"mb-4"}>
              <Row>
                  <Col>
                      <Media>
                          <Media left>
                              <Media object style={{
                                  maxHeight: '100%',
                                  maxWidth: '100%',
                                  opacity: "70%"
                              }}
                                     src={headerImg} alt="ETH MTC Header" />
                          </Media>
                      </Media>
                  </Col>
              </Row>
          </Container>
          </div>
    );
  }
}

export default Header;
