import React from "react";

import {Col, Row} from "reactstrap";

class TechnicalInstructions extends React.Component {
    render() {
        return <>
            <Row>
                <Col>
                    <h4>Technical instructions and remuneration</h4>
                    <h5>Technical</h5>
                    <p>Once you're done with one article you are free to label the next one
                    and as many as you want up to a maximum of XX. As previously mentioned you can pause
                    the work at any time and pick it up from where you left later on, the replies you've given for
                    the current article are saved and reloaded.</p>
                    <p>
                        In order to retain high quality data, it's not possible to use the website from mobile devices
                        (Tablets are allowed).
                    </p>
                    <h5>Remuneration</h5>
                    <p>Based on our internal studies, we measured that an article takes on average
                    XX minutes to measure. At a wage of XX CHF per hour, this means XX CHF per each labelled article.
                        An article is considered completed when all the answers are properly given
                    and the submit button is pressed. No money will be handed out for articles that are
                    only half labelled. </p>
                </Col>
            </Row>
        </>;
    }
}

export default TechnicalInstructions;
