import React from "react";

import {Col, Row} from "reactstrap";
import PlutchikSelector from "./PlutchikSelector";

class Paragraph extends React.Component {
    static defaultProps = {
        contentBackgroundColor: "#f2f0e6",
        instructionsTextColor: "#1e0ead",
        margins: "m1-3 mt-4 mb-4"
    };

  render() {
      return (
            <Row className={this.props.margins + " align-items-center"}
                 style={{background: this.props.error ? "#FF9991" : null,
                 overflow: "hidden"}}
            >


                <Col style={{background: this.props.contentBackgroundColor,
                    height: "100%",
                    paddingTop: 1000,
                    marginTop: -1000,
                    paddingBottom: 1000,
                marginBottom:-1000}}
                     xs={12} sm={12} md={5} lg={5} xl={5}
                >
                    <div className={"pt-2 pb-2"}>{this.props.children}</div>
                </Col>

                <Col xs={12} sm={12} md={7} lg={7} xl={7}>
                    <PlutchikSelector
                        emotionStatus={this.props.emotionStatus}
                                      onClick={this.props.onClick}
                        instructionsTextColor={this.props.instructionsTextColor}/>
                </Col>
            </Row>
    );
  }
}

export default Paragraph;
