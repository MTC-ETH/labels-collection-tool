import React from "react";

import {Col, Row, Table, Container} from "reactstrap";
import Labelling from "../../views/Labelling";
import StanceSelectorAbstract from "../Labelling/StanceSelectorAbstract";



class ExampleTableLine extends React.Component {
    render() {
        return <tr>
            <StanceCell stanceName={this.props.stanceName}/>
            <td className={"align-middle"} style={{background: Labelling.defaultProps.contentBackgroundColor}}>
                {this.props.children}
            </td>
            <td className={"align-middle"}>Should abortion be legal?</td>
        </tr>;
    }
}

class StanceCell extends React.Component {
    render() {
        console.log(StanceSelectorAbstract.optionsMap);
        console.log(this.props.stanceName);
        const stance = StanceSelectorAbstract.optionsMap[this.props.stanceName];
        return <td className={"text-center align-middle"} style={{background: stance.color + "8A"}}>
            <Container>
                <Row>
                    <Col>
                        <span role="img"
                              style={{fontSize: 32}}
                              aria-label={stance.name + " emoji"}>
                            {stance.emoji}
                        </span>
                    </Col>
                </Row>
                <Row className={"mt-n1 mb-1"}>
                    <Col>
                        <b>{stance.name}</b>
                    </Col>
                </Row>
            </Container>
        </td>;
    }
}


class StanceExamplesBodyRow extends React.Component {
    render() {
        return <>
            <Row>
                <Col>
                    <Table>
                        <thead>
                        <tr className={"text-center"}>
                            <th className={"align-middle p-1"}>Stance</th>
                            <th className={"align-middle p-1"}>Example article</th>
                            <th className={"align-middle p-1"}>Stance question</th>
                        </tr>
                        </thead>
                        <tbody>
                        <ExampleTableLine stanceName={"Ja, dafür"}>
                            The choice over when and whether to have children is central to a woman’s independence
                            and ability to determine her future.
                        </ExampleTableLine>
                        <ExampleTableLine stanceName={"Diskutierend"}>
                            If we conclude that abortion is not morally wrong, that doesn't mean that it's right to
                            have an abortion; we need to ask whether having an abortion is the best thing
                            (or least bad thing) to do in each particular case.
                            If we conclude that abortion is morally wrong, that doesn't mean that it's always
                            impermissible to have an abortion; we need to ask whether having an abortion is less wrong
                            than the alternatives.
                        </ExampleTableLine>
                        <ExampleTableLine stanceName={"Nein, gegen"}>
                            The killing of an innocent human being is wrong, even if that human being has yet to be born.
                        </ExampleTableLine>
                        <ExampleTableLine stanceName={"Kein Bezug"}>
                            Most female business owners who have attended networking events can relate to this
                            scenario: You walk into a crowded seminar and can count the number of women there on one
                            hand. When women entrepreneurs talk business with primarily male executives, it can be
                            unnerving.
                        </ExampleTableLine>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </>;
    }
}

export default StanceExamplesBodyRow;
