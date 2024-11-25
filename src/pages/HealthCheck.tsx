import { Accordion, Col, Container, Row } from "react-bootstrap";

export default function HealthCheck(props: any) {
    return <>
        <Container>
            <Row>
                <Col>
                    <Accordion defaultActiveKey="0">
                    </Accordion>
                </Col>
            </Row>
        </Container>
    </>
};