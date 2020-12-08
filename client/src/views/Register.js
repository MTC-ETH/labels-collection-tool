// Copyright 2020-2021, ETH Zurich, Media Technology Center
//
// This file is part of Labels Collection Tool (LCT) at MTC, in the scope of the project
// Emotion and Stance detection for German text.
//
// Labels Collection Tool (LCT) is a free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Labels Collection Tool (LCT) is distributed in the hope that it will be useful for similar projects,
// but Labels Collection Tool (LCT); without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser Public License for more details.
//
// You should have received a copy of the GNU Lesser Public License
// along with Labels Collection Tool (LCT). If not, see <https://www.gnu.org/licenses/>.

import React from "react";
import {Container} from "reactstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Col from "reactstrap/es/Col";
import Row from "reactstrap/es/Row";

class AuthenticateLabeller extends React.Component {

    static emailSubject = "Studienregistrierung";
    static emailText = "Bitte melden Sie mich für die Studie an.%0D%0A" + "[Ihr Name]%0D%0A" + "[Ihr Familienname]%0D%0A" +
        "[Ihr Geburtsdatum]%0D%0A%0D%0A" + "Ich habe die Bedingungen gelesen und akzeptiere sie.%0D%0A%0D%0A" + "Mit freundlichen Grüßen%0D%0A";

    render() {
        return (<>
            <Header/>
            <Container className="shape-container align-items-center">
                <Row>
                    <Col>
                <h2>Anmeldung</h2>

                    <p>Um sich für die Studie anzumelden, senden Sie bitte eine E-Mail an <a
                        href={"mailto:mtc@ethz.ch@gmail.com?subject=" + AuthenticateLabeller.emailSubject +
                        "&body=" + AuthenticateLabeller.emailText}>
                        mtc@ethz.ch
                    </a> unter Angabe:
                        <ul>
                            <li>Ihres Vor- und Nachnamens</li>
                            <li>Ihres Geburtsdatums</li>
                            <li>Ihrer Zustimmung zu den <a href={"/termsandconditions"} target={"_blank"} rel="noopener noreferrer"> Bedingungen </a>
                            </li>
                        </ul>
                    </p>
                <p>
                        Wir werden dies prüfen und Ihnen ein Token und einen Link zum Start der Studie zusenden.
                        Bitte beachten Sie, dass dieses Verfahren nicht autoamtisch ist und einige Tage dauern kann.
                    </p>
                        <p>Sie können <a
                            href={"mailto:mtc@ethz.ch?subject=" + AuthenticateLabeller.emailSubject +
                            "&body=" + AuthenticateLabeller.emailText}>
                            diese Vorlage
                        </a> direkt verwenden.</p>
                    </Col>
                </Row>
            </Container>
                <Footer/>
            </>
        );
    }
}

export default AuthenticateLabeller;
