import React from "react";

// reactstrap components
import {Col, Row} from "reactstrap";
import PlutchikSelector8WithIntensitySlider from "./PlutchikSelector8WithIntensitySlider";
import PlutchikSelector8WithIntensitySliderFactualAndUnsure2
    from "./PlutchikSelector8WithIntensitySliderFactualAndUnsure2";

class Paragraph extends React.Component {
    static defaultProps = {
        contentBackgroundColor: "#f2f0e6",
        instructionsTextColor: "#1e0ead"
    };

  render() {
      return (
            <Row className={"m1-3 mt-4 mb-4 align-items-center"}
                 style={{background: this.props.error ? "#FF9991" : null,
                 overflow: "hidden"}}
            >


                <Col style={{background: this.props.contentBackgroundColor,
                    height: "100%",
                    paddingTop: 1000,
                    marginTop: -1000,
                    paddingBottom: 1000,
                marginBottom:-1000}}
                     xs={12} sm={6} md={6} lg={6} xl={6}
                >
                    <div className={"pt-2 pb-2"}>{this.props.children}</div>
                </Col>

                <Col xs={12} sm={6} md={6} lg={6} xl={6}>
                    <PlutchikSelector8WithIntensitySliderFactualAndUnsure2
                        emotionStatus={this.props.emotionStatus}
                                      onClick={this.props.onClick}
                    onClickIntensity={this.props.onClickIntensity}
                        instructionsTextColor={this.props.instructionsTextColor}/>
                </Col>
            </Row>
    );
  }
}

export default Paragraph;
