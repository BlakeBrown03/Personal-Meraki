import { useEffect, useState } from "react";
import {
	Accordion,
	Button,
	Card,
	Col,
	Container,
	Row,
	Table
} from "react-bootstrap";
import ClientTable from "../components/ClientTable";

export default function Clients(props: any) {
	// State to store networks data
	const [networks, setNetworks] = useState<any[]>([]);
	// State to store clients data
	const [clients, setClients] = useState([]);
	// State to store the currently clicked network
	const [clickedNetwork, setClickedNetwork] = useState<string>("");
	// Retrieve API key from session storage
	const apiKey = JSON.parse(sessionStorage.getItem("apiKey") || '""');

	// Function to fetch networks data from the API
	async function fetchData(): Promise<void> {
		const response = await fetch(
			"http://localhost:3000/https://api.meraki.com/api/v1/organizations/289024/networks",
			{
				headers: {
					"X-Cisco-Meraki-API-Key": apiKey
				}
			}
		);
		const respData = await response.json();
		setNetworks(respData);
	}

	// Function to fetch clients data for a specific network from the API
	async function fetchClients(network: any): Promise<void> {
		if (!network) {
			return;
		}
		const response = await fetch(
			`http://localhost:3000/https://api.meraki.com/api/v1/networks/${network.id}/clients`,
			{
				headers: {
					"X-Cisco-Meraki-API-Key": apiKey
				}
			}
		);
		const respData = await response.json();
		console.log(respData);
		setClients(respData);
	}

	// Fetch networks data when the component mounts
	useEffect(() => {
		fetchData();
	}, []);

	// Fetch clients data when a network is clicked
	useEffect(() => {
		fetchClients(clickedNetwork);
	}, [clickedNetwork]);

	return (
		<Container fluid>
			<Row>
				<Col xs={3}>
					<Accordion defaultActiveKey="0">
						<Accordion.Item eventKey="0">
							<Accordion.Header>Networks</Accordion.Header>
							<Accordion.Body>
								<Col
									style={{
										overflow: "scroll",
										maxHeight: 700
									}}>
									{networks.map(network => {
										return (
											<Row key={network.id}>
												<Card style={{ marginTop: 5 }}>
													<Button
														style={{
															color: "black",
															textDecoration:
																"none"
														}}
														variant="link"
														onClick={() =>
															setClickedNetwork(
																network
															)
														}>
														{network.name}
													</Button>
												</Card>
											</Row>
										);
									})}
								</Col>
							</Accordion.Body>
						</Accordion.Item>
					</Accordion>
				</Col>
				<Col style={{ textAlign: "center" }}>
					<h1>Clients</h1>
					{clients.length > 0 ? (
						<ClientTable clients={clients} />
					) : (
						<p>No clients to display</p>
					)}
				</Col>
			</Row>
		</Container>
	);
}
