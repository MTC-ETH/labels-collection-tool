import React from "react";
import {Badge, Col, Row} from "reactstrap";

class InfoRow extends React.Component {

    static defaultProps = {
        color: "primary",
    };

    render() {
        return <Row>
            <Col>{this.props.children}</Col>
            <Col>{this.props.counter !== null && this.props.counter !== undefined ?
                (<Badge color={this.props.color}>{this.props.counter}</Badge>)
                : ((this.props.fallback !== null && this.props.fallback !== undefined) ?
                    <Badge color={this.props.color}>{this.props.fallback}</Badge> : null)}
            </Col>
        </Row>;
    }
}

export default InfoRow;
