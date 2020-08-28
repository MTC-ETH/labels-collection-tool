import React from "react";

import {Container} from "reactstrap";

class ContainedHr extends React.Component {
    static defaultProps = {
      margins: "mt-4 mb-4"
    };

    render() {
        return <Container className={"p-0 " + this.props.margins}>
            <hr/>
        </Container>;
    }
}

export default ContainedHr;
