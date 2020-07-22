import React from "react";

// reactstrap components
import {Button, Col, Container, Row} from "reactstrap";
import StanceSelectorOrizontal from "./StanceSelectorOrizontal";

class SubmitInstructionsAndButton extends React.Component {

  render() {
      return (
          <>
            <Container className="shape-container align-items-center pt-4 mb-5" style={{
                color: "blue",
            }}>
                <Row>
                    <Col>
                        <h5>Submit</h5>
                        <p>If everything looks good to you, submit and go to next article to be labelled</p>
                    </Col>
                </Row>
                <Button className="p-1"
                        style={{
                            // background: "#" + color,
                            // color: "black",
                            width: "100%",
                            fontSize: "25px"
                        }}
                        onClick={this.props.onClick}>
                    <b>➡️ Submit and go to next article ➡️</b>
                </Button>
            </Container>
        </>
    );
  }
}

export default SubmitInstructionsAndButton;
