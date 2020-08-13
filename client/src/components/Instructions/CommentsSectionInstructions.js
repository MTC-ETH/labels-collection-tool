import React from "react";

// reactstrap components
import {Col, Row} from "reactstrap";

class CommentsSectionInstructions extends React.Component {
    render() {
        return <>
            <Row>
                <Col>
                    <h4>Comments section</h4>
                    <p>Similarly to the article, you are shown comments that were written under the given article and
                    you are asked to label them for emotions and for stance.<br/>
                        In particular, for each comment:</p>
                        <ul>
                            <li>
                                Click on the emotion that replies to the question:  <br/>
                                "<i>Which is the emotion conveyed in this comment</i>?" <br/>
                                Again you can only select one emotion per comment. Select the emotion that
                                best matches the emotion conveyed in the comment. <br/>
                            </li>
                            <li>
                                Click on the stance that replies to the question: <br/>
                                "<i>Is this comment in favour or against the article?</i>" <br/>
                                Please bear in mind that the question refers to <b>the stance
                                of the comment towards the article and not towards the previously presented topic.</b> <br/>
                            </li>
                        </ul>
                </Col>
            </Row>
        </>;
    }
}

export default CommentsSectionInstructions;
