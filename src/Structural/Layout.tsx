import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Layout() {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Nav>
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="networks">Networks</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
};