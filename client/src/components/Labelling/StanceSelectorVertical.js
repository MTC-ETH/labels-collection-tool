import React from "react";
import {Col, Container, Row} from "reactstrap";
import StanceSelectorAbstract from "./StanceSelectorAbstract";

class StanceSelectorVertical extends StanceSelectorAbstract {

    render() {
        return (
            <Container>
                {this.options.map((option, index) => {
                    let borders = "pr-1 pl-0";
                    if(option.name.toLowerCase() === "unrelated"){
                        borders += " mt-2";
                    }
                    else {
                        borders += " mt-1";
                    }
                    return <Row key={index}>
                       <Col className={borders}>
                           {this.getButtonObject(option,12)}
                       </Col>
                    </Row>;
                })
                }

            </Container>
        );
    }
}

export default StanceSelectorVertical;
