import React from "react";
import {Badge, Col, Row} from "reactstrap";

class InfoRow extends React.Component {

    static defaultProps = {
        color: "primary",
    };

    render() {
        return <Row>
            <Col xs={12} sm={8} md={7} lg={7} xl={7}>{this.props.children}</Col>
            <Col xs={12} sm={4} md={5} lg={5} xl={5}>{this.props.counter !== null && this.props.counter !== undefined ?
                (<Badge color={this.props.color}>{this.props.counter}</Badge>)
                : ((this.props.fallback !== null && this.props.fallback !== undefined) ?
                    <Badge color={this.props.color}>{this.props.fallback}</Badge> : null)}
            </Col>
        </Row>;
    }
}

export default InfoRow;
