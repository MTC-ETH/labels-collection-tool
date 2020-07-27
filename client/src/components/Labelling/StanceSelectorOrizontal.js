import React from "react";
import {Col, Container, Row} from "reactstrap";
import StanceSelectorAbstract from "./StanceSelectorAbstract";

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
            </Container>
        );
    }
}

export default StanceSelectorOrizontal;
