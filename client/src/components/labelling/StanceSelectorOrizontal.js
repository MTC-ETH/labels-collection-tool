import {Card, CardBody} from "reactstrap";
import React from "react";
import {Button, Col, Container, Row} from "reactstrap";

class StanceSelector extends React.Component {

    constructor(props, context) {
        super(props, context);
        
    }

    options = [
        {name: "In favour", color: "2FB774"},
        {name: "Discussing", color: "FBAF64"},
        {name: "Against", color: "F15A61"},
        {name: "Unrelated", color: "E7E6E6"},
        ];

    render() {
        return (
            <Container>
                <Row>
                {this.options.map(option => {
                    let borders = "pr-1 pl-0";
                    if(option.name.toLowerCase() === "unrelated"){
                        borders += " ml-2"
                    }
                    return (
                       <Col className={borders}>
                           <Button className="p-1"
                                                style={{background: "#" + option.color,
                                                    width: "100%",
                                                color: "black",
                                                fontSize: "16px"
                                                }}>
                                <b>{option.name}</b>
                            </Button>
                       </Col>);
                })
                }
                    </Row>
            </Container>
        );
    }
}

export default StanceSelector;
