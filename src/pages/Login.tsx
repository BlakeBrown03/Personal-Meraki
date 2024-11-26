import { useContext, useState } from "react";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LoginStatusContext from "../LoginStatusContext";

export default function Login() {
	const [key, setKey] = useState("");
	const navigate = useNavigate();
	const [loginStatus, setLoginStatus] = useContext(LoginStatusContext);

	/**
	 * Sets the API key in sessionStorage and navigates to the networks page
	 * @param e prevents default form submission
	 */
	function registerKey(e: any): void {
		e?.preventDefault();
		if (key === "") {
			alert("Please enter an API key");
			return;
		}
		sessionStorage.setItem("apiKey", JSON.stringify(key.toLowerCase()));
		setLoginStatus(true);
		navigate("/networks");
	}

	return (
		<Container fluid>
			<Row>
				<Col>
					<h1 style={{ textAlign: "center" }}>
						Welcome to Meraki Dashboard
					</h1>
					<p style={{ textAlign: "center" }}>
						To generate your own API Key go{" "}
						<a href="https://account.meraki.com/secure/login/dashboard_login">
							here
						</a>
						, and create an account to generate one
					</p>
				</Col>
				<Col>
					<Form style={{ textAlign: "center" }}>
						<Form.Group>
							<Form.Label>API Key</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter API Key"
								onChange={e => setKey(e.target.value)}
								onKeyDown={e =>
									e.key === "Enter" ? registerKey(e) : null
								}
							/>
						</Form.Group>
						<Button
							variant="primary"
							onClick={registerKey}
							style={{ marginTop: 10 }}>
							Submit
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
}
