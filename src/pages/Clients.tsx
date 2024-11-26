import { useEffect, useState } from "react";
import { Accordion, Button, Col, Container, Row } from "react-bootstrap";

export default function Clients(props: any) {
	const [networks, setNetworks] = useState<any[]>([]);
	const [clients, setClients] = useState<any[]>([]);
	const [clientTable, setClientTable] = useState<any[]>([]);
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

	async function fetchClients(networkId: string): Promise<void> {
		const response = await fetch(
			`http://localhost:3000/https://api.meraki.com/api/v1/networks/${networkId}/clients`,
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
											<Row>
												<Button variant="link">
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
				</Col>
			</Row>
		</Container>
	);
}
