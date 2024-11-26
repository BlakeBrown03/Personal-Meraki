import { useEffect, useState, createContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import LoginStatusContext from "../LoginStatusContext";

export default function Layout() {
	const apiKey = JSON.parse(sessionStorage.getItem("apiKey") || '""');
	const [loginStatus, setLoginStatus] = useState<boolean>(
		apiKey !== "" ? true : false
	);
	const [displayNavs, setDisplayNavs] = useState<JSX.Element | null>(null);

	/**
	 * check if the user is logged in
	 * If they are logged in, then display the rest of the pages
	 * @returns {boolean} true if the user is logged in, false otherwise
	 */
	useEffect(() => {
		console.log(apiKey, loginStatus);
		if (loginStatus) {
			setDisplayNavs(() => {
				return (
					<>
						<Nav.Link as={Link} to="networks">
							Networks
						</Nav.Link>
						<Nav.Link as={Link} to="clients">
							Clients
						</Nav.Link>
						<Nav.Link as={Link} to="health-check">
							Health Check
						</Nav.Link>
					</>
				);
			});
		} else {
			setDisplayNavs(() => <></>);
		}
	}, [loginStatus]);

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
					{displayNavs}
				</Nav>
			</Navbar>
			<Container>
				<LoginStatusContext.Provider
					value={[loginStatus, setLoginStatus]}>
					<Outlet />
				</LoginStatusContext.Provider>
			</Container>
		</div>
	);
}
