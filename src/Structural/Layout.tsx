import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
	return (
		<div>
			<Navbar>
				<Navbar.Brand href="/">
					<img src="/src/assets/logo-text.svg" width="250" />
				</Navbar.Brand>
				<Nav>
					<Nav.Link as={Link} to="/">
						Home
					</Nav.Link>
					<Nav.Link as={Link} to="networks">
						Networks
					</Nav.Link>
					<Nav.Link as={Link} to="health-check">
						Health Check
					</Nav.Link>
				</Nav>
			</Navbar>
			<Container>
				<Outlet />
			</Container>
		</div>
	);
}
