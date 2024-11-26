import { useEffect, useState } from "react";
import { Accordion, Button, Col, Container, Row } from "react-bootstrap";

export default function Clients(props: any) {
	const [networks, setNetworks] = useState<any[]>([]);
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

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<Container fluid>
			<Row>
				<Col>
					<Accordion>
						<Accordion.Item eventKey="0">
							<Accordion.Header>Networks</Accordion.Header>
							<Accordion.Body>
								{networks.map(network => {
									return <Button>{network.name}</Button>;
								})}
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
