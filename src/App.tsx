import { useEffect, useState } from "react";
import "./App.css";
import NetworkCard from "./NetworkCard";
import { Col, Container, Row } from "react-bootstrap";

function App() {
	const [networks, setNetworks] = useState([]);

	async function fetchData() {
		const response = await fetch(
			"http://localhost:3000/https://api.meraki.com/api/v1/organizations/289024/networks",
			{
				headers: {
					"X-Cisco-Meraki-API-Key":
						"e1613b45cd4d8fe315ce194c039381176091a534"
				}
			}
		);
		const respData = await response.json();
		setNetworks(respData);
		console.log(respData);
	}

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<h1 style={{ textAlign: "center" }}>Welcome to Meraki API</h1>
			{networks.length > 0 ? (
				<Container>
					<Row>
						{networks.map((network: any) => (
							<Col key={network.id} xs={12} sm={6} md={4}>
								<NetworkCard {...network}></NetworkCard>
							</Col>
						))}
					</Row>
				</Container>
			) : (
				<h1 style={{ textAlign: "center" }}>Loading...</h1>
			)}
		</>
	);
}

export default App;
