import { useEffect, useState } from "react";
import { Accordion, Button, Col, Container, Row, Table } from "react-bootstrap";
import ClientTable from "../components/ClientTable";

export default function Clients(props: any) {
	const [networks, setNetworks] = useState<any[]>([]);
	const [clients, setClients] = useState([]);
	const [clickedNetwork, setClickedNetwork] = useState<string>("");
	const apiKey = JSON.parse(sessionStorage.getItem("apiKey") || '""');

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
		setClients(respData);
	}

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		fetchClients(clickedNetwork);
	}, [clickedNetwork]);

	return (
		<Container fluid>
			<Row>
				<Col xs={3}>
					<Accordion>
						<Accordion.Item eventKey="0">
							<Accordion.Header>Networks</Accordion.Header>
							<Accordion.Body>
								<Col>
									{networks.map(network => {
										return (
											<Row key={network.id}>
												<Button
													variant="link"
													onClick={() =>
														setClickedNetwork(
															network
														)
													}>
													{network.name}
												</Button>
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
