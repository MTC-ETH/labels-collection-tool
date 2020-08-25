import React from "react";
import {Col, Container, Row} from "reactstrap";
import StanceSelectorAbstract from "./StanceSelectorAbstract";
import ImNotSureCheckboxRow from "./ImNotSureCheckboxRow";

class StanceSelectorOrizontal extends StanceSelectorAbstract {


    render() {
        return (
            <Container>
                <Row>
                {this.options.map((option, index) => {
                    let borders = "pr-1 pl-0";
                    if(option.name.toLowerCase() === "unrelated"){
                        borders += " ml-2"
                    }

                    return (
                       <Col key={index} className={borders}>
                           {this.getButtonObject(option,16)}
                       </Col>);
                })
                }
                    </Row>
                <ImNotSureCheckboxRow fontSize={18} checked={this.props.stanceStatus.notSure} onClick={this.props.onClick}/>
            </Container>
        );
    }
}

export default StanceSelectorOrizontal;
